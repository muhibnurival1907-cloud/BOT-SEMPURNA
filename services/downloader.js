const { default: YTDlpWrap } = require("yt-dlp-wrap");
const fs = require("fs");
const path = require("path");

const metadata = require("./metadata");

const ytBinary =
    process.platform === "win32"
        ? path.join(__dirname, "../bin/yt-dlp.exe")
        : "yt-dlp";

const yt = new YTDlpWrap(ytBinary);

// Folder penyimpanan sementara
const tempDir = path.join(__dirname, "../temp");

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}

// Membersihkan nama file
function sanitize(name) {
    return name
        .replace(/[\\/:*?"<>|]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}

module.exports = async function (song) {

    const filename = sanitize(
        `${song.author} - ${song.title}`
    );

    const output = path.join(
        tempDir,
        `${filename}.%(ext)s`
    );

    const finalMp3 = path.join(
        tempDir,
        `${filename}.mp3`
    );

    // hapus file lama
    if (fs.existsSync(finalMp3)) {
        fs.unlinkSync(finalMp3);
    }

    const args = [

        song.url,

        "--extract-audio",

        "--audio-format",
        "mp3",

        "--audio-quality",
        "0",

        "--embed-thumbnail",

        "--no-playlist",

        "--no-warnings",

        "--prefer-ffmpeg",

        "-o",

        output

    ];

    // Windows perlu lokasi ffmpeg
    if (process.platform === "win32") {

        args.push(
            "--ffmpeg-location",
            path.join(__dirname, "../bin")
        );

    }

    console.log("==========================");
    console.log("Downloading:");
    console.log(song.title);
    console.log("==========================");

    try {

        await yt.execPromise(args);

    } catch (err) {

        console.error("yt-dlp gagal:");

        console.error(err);

        throw err;

    }

    if (!fs.existsSync(finalMp3)) {

        throw new Error("MP3 tidak ditemukan.");

    }

    try {

        await metadata(song, finalMp3);

    } catch (err) {

        console.warn("Metadata gagal:");

        console.warn(err.message);

    }

    return {

        path: finalMp3,

        filename: `${filename}.mp3`

    };

};