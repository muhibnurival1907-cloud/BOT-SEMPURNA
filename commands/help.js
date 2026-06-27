const { Markup } = require("telegraf");

module.exports = async (ctx) => {

    await ctx.reply(
`🎵 <b>Marbeque Music Bot v3.1</b>

Selamat datang di <b>Marbeque Music</b>! 🎧

Bot ini memungkinkan kamu mencari dan mengunduh lagu dari YouTube dalam format MP3 lengkap dengan metadata dan cover album.

━━━━━━━━━━━━━━━━━━

📖 <b>Perintah</b>

/start - Memulai bot
/help - Bantuan
/about - Tentang bot

━━━━━━━━━━━━━━━━━━

🎵 <b>Cara Menggunakan</b>

1️⃣ Kirim judul lagu

Contoh:
<code>Die With A Smile</code>

2️⃣ Pilih lagu dari daftar

3️⃣ Tunggu proses download

4️⃣ Bot akan mengirim MP3 lengkap dengan:

✅ Cover Album
✅ Metadata
✅ Judul
✅ Nama Artis

━━━━━━━━━━━━━━━━━━

💙 Selamat menikmati musik! 🎧`,
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