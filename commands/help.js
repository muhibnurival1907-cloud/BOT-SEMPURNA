module.exports = async (ctx) => {
    await ctx.reply(
`🎵 <b>Marbeque Music Bot v3.1</b>

Selamat datang di <b>Marbeque Music</b>! 🎧

Bot ini memungkinkan kamu mencari dan mengunduh lagu dari YouTube dalam format MP3 dengan metadata dan cover album secara otomatis.

━━━━━━━━━━━━━━━━━━

📖 <b>Perintah</b>

/start - Memulai bot
/help - Menampilkan bantuan

━━━━━━━━━━━━━━━━━━

🎵 <b>Cara Menggunakan</b>

1️⃣ Kirim judul lagu

Contoh:
<code>Die With A Smile</code>

2️⃣ Pilih lagu dari daftar yang muncul

3️⃣ Tunggu proses download selesai

4️⃣ Bot akan mengirim file MP3 lengkap dengan:
✅ Cover Album
✅ Judul Lagu
✅ Nama Artis
✅ Metadata

━━━━━━━━━━━━━━━━━━

⚡ <b>Fitur</b>

🎼 Pencarian lagu cepat
🎵 MP3 kualitas terbaik
🖼 Cover album otomatis
📝 Metadata otomatis
☁️ Online 24/7

━━━━━━━━━━━━━━━━━━

💙 Terima kasih telah menggunakan
<b>Marbeque Music Bot</b>

Selamat menikmati musik! 🎧`,
        {
            parse_mode: "HTML"
        }
    );

};