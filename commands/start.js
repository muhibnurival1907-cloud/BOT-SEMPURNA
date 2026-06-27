const { Markup } = require("telegraf");
const path = require("path");

module.exports = async (ctx) => {

    const photo = {
        source: path.join(__dirname, "../assets/avatar.jpg")
    };

    await ctx.replyWithPhoto(photo, {
        caption:
`🎵 <b>Marbeque Music Bot v3.1</b>

Selamat datang di <b>Marbeque Music</b>! 🎧

Bot ini memungkinkan kamu mencari dan mengunduh lagu dari YouTube dalam format MP3 berkualitas tinggi lengkap dengan metadata dan cover album otomatis.

━━━━━━━━━━━━━━━━━━

✨ <b>Fitur Utama</b>

🎼 Pencarian lagu super cepat
🎵 Download MP3 kualitas terbaik
🖼 Cover album otomatis
📝 Metadata lengkap
☁️ Online 24/7

━━━━━━━━━━━━━━━━━━

📌 <b>Cara Menggunakan</b>

• Tekan <b>🎵 Cari Lagu</b>
atau
• Langsung kirim judul lagu.

Contoh:

<code>Die With A Smile</code>

━━━━━━━━━━━━━━━━━━

💙 Selamat menikmati musik!

👨‍💻 <b>Author</b>
@OribeAzusa31`,
        parse_mode: "HTML",
        ...Markup.keyboard([
            ["🎵 Cari Lagu"],
            ["📖 Bantuan", "👨‍💻 Tentang Bot"]
        ])
            .resize()
            .persistent()
    });

};