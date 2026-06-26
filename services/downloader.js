const { default: YTDlpWrap } = require("yt-dlp-wrap");
const fs = require("fs");
const path = require("path");

const metadata = require("./metadata");

// ================================
// Folder
// ================================

const BIN_DIR = path.join(__dirname, "../bin");
const TEMP_DIR = path.join(__dirname, "../temp");

if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
}

// ================================
// Binary yt-dlp
// ================================

const ytBinary = process.platform === "win32"
    ? path.join(BIN_DIR, "yt-dlp.exe")
    : path.join(BIN_DIR, "yt-dlp");

const yt = new YTDlpWrap(ytBinary);

function sanitizeFilename(name) {

    return name
        .replace(/[\\/:*?"<>|]/g, "")
        .replace(/\s+/g, " ")
        .trim();

}

async function ensureYtDlp() {

    // Pastikan folder bin ada
    if (!fs.existsSync(BIN_DIR)) {
        fs.mkdirSync(BIN_DIR, { recursive: true });
    }

    if (fs.existsSync(ytBinary)) {
        return;
    }

    console.log("⬇ Downloading yt-dlp...");

    await YTDlpWrap.downloadFromGithub(ytBinary);

    if (process.platform !== "win32") {
        fs.chmodSync(ytBinary, 0o755);
    }

    console.log("✅ yt-dlp downloaded.");
}

// ================================
// Download Lagu
// ================================

module.exports = async function (song) {

    await ensureYtDlp();

    const filename = sanitizeFilename(
        `${song.author} - ${song.title}`
    );

    const output = path.join(
        TEMP_DIR,
        `${filename}.mp3`
    );

    if (fs.existsSync(output)) {
        fs.unlinkSync(output);
    }

    const args = [

        song.url,

        "-x",

        "--audio-format",
        "mp3",

        "--audio-quality",
        "0",

        "--no-playlist",

        "-o",
        output

    ];

    // Windows memakai ffmpeg.exe dari folder bin
    if (process.platform === "win32") {

        args.push(
            "--ffmpeg-location",
            BIN_DIR
        );

    }

    try {

        console.log("Downloading :", song.title);

        await yt.execPromise(args);

        console.log("✓ Download selesai");

    } catch (err) {

        throw new Error(
            "Gagal mengunduh audio.\n" + err.message
        );

    }

    // ================================
    // Metadata
    // ================================

    try {

        await metadata(song, output);

        console.log("✓ Metadata berhasil");

    } catch (err) {

        console.warn(
            "Metadata gagal:",
            err.message
        );

    }

    // ================================

    return {

        path: output,

        filename: `${filename}.mp3`

    };

};