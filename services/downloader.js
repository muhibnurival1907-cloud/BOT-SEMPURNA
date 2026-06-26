const { default: YTDlpWrap } = require("yt-dlp-wrap");
const fs = require("fs");
const path = require("path");

const metadata = require("./metadata");

const ytBinary =
    process.platform === "win32"
        ? path.join(__dirname, "../bin/yt-dlp.exe")
        : "yt-dlp";

const yt = new YTDlpWrap(ytBinary);