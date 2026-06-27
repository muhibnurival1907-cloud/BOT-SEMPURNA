require("dotenv").config();

const fs = require("fs");
const { Telegraf } = require("telegraf");

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

bot.hears(/^[^/].*/, music);

const { Markup } = require("telegraf");

bot.hears("🎵 Cari Lagu", async (ctx) => {
        await ctx.reply(
            "🎵 Silakan kirim judul lagu yang ingin dicari."
            Markup.removeKeyboard()
        );
});        

bot.hears("👨‍💻 Tentang Bot", about);

bot.action(/music_(\d+)/, async (ctx) => {

    await ctx.answerCbQuery();

    const songs = cache.get(ctx.chat.id);

    if (!songs) {
        return ctx.reply("❌ Daftar lagu sudah kedaluwarsa.\nSilakan cari lagi.");
    }

    const index = Number(ctx.match[1]);

    const song = songs[index];

    if (!song) {
        return ctx.reply("❌ Lagu tidak ditemukan.");
    }

    const progress = await ctx.reply("📥 Sedang mengunduh lagu...");

    try {

        const file = await download(song);

        await ctx.telegram.editMessageText(
            ctx.chat.id,
            progress.message_id,
            undefined,
            "📤 Mengirim lagu..."
        );

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

        // hapus file sementara
        if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
        }

        await ctx.telegram.deleteMessage(
            ctx.chat.id,
            progress.message_id
        );

    } catch (err) {

        console.error(err);

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