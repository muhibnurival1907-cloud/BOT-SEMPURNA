const path = require("path");

module.exports = async (ctx) => {

    const photo = {
        source: path.join(__dirname, "../assets/avatar.jpg")
    };

    const caption = `
🎵 <b>Marbeque Music</b>

━━━━━━━━━━━━━━━━━━

🎧 Selamat datang di Marbeque Music Bot!

Bot ini dapat mencari lagu dari YouTube dan mengirimkannya dalam format MP3 lengkap dengan metadata.

━━━━━━━━━━━━━━━━━━

✨ Fitur

• 🔍 Cari lagu
• 🎵 Download MP3
• 🖼 Cover Album
• 📝 Metadata Lagu
• ☁️ Server Railway 24/7

━━━━━━━━━━━━━━━━━━

📌 Cara menggunakan:

Kirim judul lagu.

Contoh:
Alan Walker Faded
Hindia Evaluasi
Nadin Amizah Bertaut

━━━━━━━━━━━━━━━━━━

Version 3.0
`;

    await ctx.replyWithPhoto(photo, {
        caption,
        parse_mode: "HTML"
    });

};