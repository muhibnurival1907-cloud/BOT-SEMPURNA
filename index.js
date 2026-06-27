require("dotenv").config();
const spotify = require("./services/spotify");

const fs = require("fs");
const { execSync } = require("child_process");
const { Telegraf, Markup } = require("telegraf");

const start = require("./commands/start");
const help = require("./commands/help");
const about = require("./commands/about");
const music = require("./commands/music");
const download = require("./services/downloader");
const cache = require("./services/cache");

const bot = new Telegraf(process.env.BOT_TOKEN);

// =====================
// COMMAND
// =====================

bot.start(start);
bot.command("help", help);
bot.command("about", about);

// =====================
// MENU KEYBOARD
// =====================

bot.hears("🎵 Cari Lagu", async (ctx) => {

    await ctx.reply(
        "🎵 Silakan kirim judul lagu yang ingin dicari.",
        Markup.removeKeyboard()
    );

});

bot.hears("📖 Bantuan", help);

bot.hears("👨‍💻 Tentang Bot", about);

// =====================
// PENCARIAN LAGU
// =====================

bot.hears(/^(?!\/).+$/, music);

// =====================
// PILIH LAGU
// =====================

bot.action(/music_(\d+)/, async (ctx) => {

    await ctx.answerCbQuery();

    const songs = cache.get(ctx.chat.id);

    if (!songs) {

        return ctx.reply(
            "❌ Daftar lagu sudah kedaluwarsa.\nSilakan cari lagi."
        );

    }

    const index = Number(ctx.match[1]);

    const song = songs[index];

    if (!song) {

        return ctx.reply("❌ Lagu tidak ditemukan.");

    }

    const progress = await ctx.reply("📥 Sedang mengunduh lagu...");

    try {

        const file = await download(song);
        console.log(file.path);

        console.log("");
        console.log("========== DOWNLOAD ==========");
        console.log(file);
        console.log("==============================");
        console.log("");

        if (!fs.existsSync(file.path)) {
            throw new Error("File MP3 tidak ditemukan:\n" + file.path);
        }

        const stats = fs.statSync(file.path);

        console.log("Nama File :", file.filename);
        console.log("Lokasi    :", file.path);
        console.log("Ukuran    :", (stats.size / 1024 / 1024).toFixed(2), "MB");

        await ctx.telegram.editMessageText(
            ctx.chat.id,
            progress.message_id,
            undefined,
            "📤 Mengirim lagu..."
        );

        console.log("➡ Mulai upload ke Telegram...");

        await ctx.replyWithAudio(
            {
                source: fs.createReadStream(file.path),
                filename: file.filename
            },
            {
                title: song.title,
                performer: song.author
            }
        );

        console.log("✅ Upload Telegram berhasil");

        if (fs.existsSync(file.path)) {

            fs.unlinkSync(file.path);

            console.log("🗑 File sementara dihapus");

        }

        await ctx.telegram.deleteMessage(
            ctx.chat.id,
            progress.message_id
        );

    } catch (err) {

        console.error("");
        console.error("========== ERROR ==========");
        console.error(err);
        console.error("===========================");
        console.error("");
        await ctx.telegram.editMessageText(
            ctx.chat.id,
            progress.message_id,
            undefined,
            "❌ Gagal mengunduh lagu."
        );
    }
});

// =====================
// ERROR
// =====================

bot.catch((err) => {

    console.error(err);

});

// =====================
// START BOT
// =====================

(async () => {

    try {

        await bot.telegram.deleteWebhook({
            drop_pending_updates: true
        });

        // ==========================
        // CEK VERSI yt-dlp
        // ==========================

        try {

            const version = execSync("yt-dlp --version")
                .toString()
                .trim();

            console.log("");
            console.log("==============================");
            console.log("yt-dlp version :", version);
            console.log("==============================");
            console.log("");

        } catch (err) {

            console.log("");
            console.log("==============================");
            console.log("yt-dlp tidak ditemukan");
            console.log(err.message);
            console.log("==============================");
            console.log("");

        }

        await bot.launch();

        console.log("");
        console.log("==============================");
        console.log("🎵 Marbeque Music Online");
        console.log("==============================");
        console.log("");

    } catch (err) {

        console.error(err);

    }

})();

// =====================
// STOP BOT
// =====================

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
