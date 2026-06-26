const { default: YTDlpWrap } = require("yt-dlp-wrap");
const path = require("path");
const fs = require("fs");
const metadata = require("./metadata");

const ytDlpPath =
    process.platform === "win32"
        ? path.join(__dirname, "../bin/yt-dlp.exe")
        : path.join(__dirname, "../bin/yt-dlp");

const yt = new YTDlpWrap(ytDlpPath);

// Menghapus karakter yang tidak valid pada nama file
function sanitize(name) {
    return name.replace(/[\\/:*?"<>|]/g, "").trim();
}

// Memastikan yt-dlp tersedia
async function ensureYtDlp() {

    if (!fs.existsSync(ytDlpPath)) {

        console.log("Downloading yt-dlp...");

        await YTDlpWrap.downloadFromGithub(ytDlpPath);

        if (process.platform !== "win32") {
            fs.chmodSync(ytDlpPath, 0o755);
        }

        console.log("yt-dlp downloaded.");

    }

}

module.exports = async function(song){

    await ensureYtDlp();

    const filename = sanitize(`${song.author} - ${song.title}`);

    const output = path.join(
        __dirname,
        "../temp",
        `${filename}.mp3`
    );

    if(fs.existsSync(output)){
        fs.unlinkSync(output);
    }

    const args = [

        song.url,

        "-x",

        "--audio-format","mp3",

        "--audio-quality","0",

        "-o",output

    ];

    // Windows menggunakan ffmpeg.exe
    if(process.platform === "win32"){

        args.push(
            "--ffmpeg-location",
            path.join(__dirname,"../bin")
        );

    }

    await yt.execPromise(args);

    await metadata(song,output);

    return {

        path:output,

        filename:`${filename}.mp3`

    };

}