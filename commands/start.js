const { Markup } = require("telegraf");

module.exports = async (ctx) => {

    await ctx.reply(
`🎵 <b>Selamat Datang di Marbeque Music</b>

Bot Telegram untuk mencari dan mengunduh lagu YouTube dalam format MP3 berkualitas tinggi.

━━━━━━━━━━━━━━━━━━

✨ Fitur

🎼 Cari lagu dengan cepat
🎵 Download MP3
🖼 Cover Album Otomatis
📝 Metadata Otomatis
☁️ Online 24 Jam

━━━━━━━━━━━━━━━━━━

AUTHOR:@OribeAzusa31

Silakan pilih menu di bawah atau langsung kirim judul lagu.`,
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