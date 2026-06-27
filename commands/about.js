const { Markup } = require("telegraf");

module.exports = async (ctx) => {

    await ctx.reply(
`🎵 <b>Marbeque Music Bot</b>

Version : <b>3.1.0</b>

Bot Telegram untuk mencari dan mengunduh lagu YouTube menjadi MP3.

━━━━━━━━━━━━━━━━━━

⚙️ Teknologi

• Node.js
• Telegraf
• yt-dlp
• FFmpeg

━━━━━━━━━━━━━━━━━━

👨‍💻 Developer

<b>@OribeAzusa31</b>

Terima kasih telah menggunakan
<b>Marbeque Music Bot</b> 💙`,
        {
            parse_mode: "HTML",
            ...Markup.keyboard([
                ["🎵 Cari Lagu"],
                ["📖 Bantuan", "👨‍💻 Tentang Bot"]
            ])
                .resize()
                .persistent()
        }
    );

};