module.exports = async (ctx) => {

    await ctx.reply(
`🎵 <b>Marbeque Music Bot</b>

Selamat datang!

📌 <b>Perintah yang tersedia</b>

/start - Memulai bot
/help - Menampilkan bantuan

🎵 <b>Cara menggunakan:</b>

1. Kirim judul lagu
Contoh:
Die With A Smile

2. Pilih lagu dari daftar

3. Tunggu hingga proses download selesai

4. Bot akan mengirim file MP3 lengkap dengan metadata dan cover.

Selamat menikmati 🎧`,
        {
            parse_mode: "HTML"
        }
    );

};