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
const CACHE_DIR = path.join(__dirname, "../cache");

if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
}
if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
}

// Membersihkan nama file
function sanitize(name) {
    return name
        .replace(/[\\/:*?"<>|]/g, "")
        .replace(/\s+/g, " ")
        .trim();
}
function getVideoId(url) {
    try {
            const u = new URL(url)
            return u.searchParams.get("v");
    } catch {
        return null;
    }
}

module.exports = async function (song) {

    const videoId = getVideoId(song.url);

if (!videoId) {
    throw new Error("Video ID tidak ditemukan.");
}

    const cacheMp3 = path.join(
    CACHE_DIR,
    `${videoId}.mp3`
);

    const filename = sanitize(
        `${song.author} - ${song.title}`
    );

    if (fs.existsSync(cacheMp3)) {

    console.log("");
    console.log("========================");
    console.log("✅ CACHE HIT");
    console.log(videoId);
    console.log("========================");
    console.log("");

    return {

        path: cacheMp3,
        filename: `${sanitize(`${song.author} - ${song.title}`)}.mp3`

    };

}

    console.log("");
    console.log("========================");
    console.log("CACHE MISS");
    console.log("========================");
    console.log("");

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

        "-f",
        "bestaudio/best",

        "--extract-audio",

        "--audio-format",
        "mp3",

        "--audio-quality",
        "0",

        "--embed-thumbnail",

        "--no-playlist",

        "--no-warnings",

        "-o",

        output

    ];

    const cookiePath = path.join(__dirname, "../cookies.txt");

    if (fs.existsSync(cookiePath)) {
          console.log("🍪 Menggunakan cookies.txt");

    args.push(
        "--cookies",
        cookiePath
    );
}

    args.push(
        "--extractor-args",
        "youtube:player_client=android"
);

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

        console.log("========================");
        console.log("Arguments:");
        console.log(args);
        console.log("========================");

        await yt.execPromise(args);

        const info = execSync(
            `ffprobe -v error -show_format -show_streams "${finalMp3}"`
        ).toString();

    console.log(info);

    } catch (err) {

        console.error("yt-dlp gagal:");

        console.error(err);

        throw err;

    }

    if (!fs.existsSync(finalMp3)) {

        throw new Error("MP3 tidak ditemukan.");

    }

    try {

        fs.copyFileSync(finalMp3, cacheMp3);

        console.log("");
        console.log("========================");
        console.log("💾 Cache disimpan (Tanpa Metadata");
        console.log(videoId);
        console.log("========================");
        console.log("");

    } catch (err) {

        console.warn(err);

    }

    return {

        path: finalMp3,

        filename: `${filename}.mp3`

    };

};