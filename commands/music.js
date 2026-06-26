const { Markup } = require("telegraf");
const { searchMusic } = require("../services/youtube");
const cache = require("../services/cache");

module.exports = async (ctx) => {

    const query = ctx.message.text.trim();

    // Abaikan semua command Telegram
    if (query.startsWith("/")) {
        return;
    }

    if (!query) {
        return ctx.reply("❌ Masukkan judul lagu.");
    }

    const searching = await ctx.reply("🔍 Sedang mencari lagu...");

    try {

        const results = await searchMusic(query);

        if (!results.length) {

            await ctx.telegram.editMessageText(
                ctx.chat.id,
                searching.message_id,
                undefined,
                "❌ Lagu tidak ditemukan."
            );

            return;
        }

        // Simpan hasil pencarian
        cache.set(ctx.chat.id, results);

        const buttons = results.map((song, index) => [

            Markup.button.callback(
                `🎵 ${song.title} • ${song.duration}`,
                `music_${index}`
            )

        ]);

        await ctx.telegram.editMessageText(

            ctx.chat.id,

            searching.message_id,

            undefined,

            `🎵 Hasil pencarian untuk:\n\n<b>${query}</b>\n\nSilakan pilih salah satu lagu.`,

            {

                parse_mode: "HTML",

                reply_markup: {

                    inline_keyboard: buttons

                }

            }

        );

    } catch (err) {

        console.error(err);

        await ctx.telegram.editMessageText(

            ctx.chat.id,

            searching.message_id,

            undefined,

            "❌ Terjadi kesalahan saat mencari lagu."

        );

    }

};