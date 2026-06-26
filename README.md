# 🎵 Marbeque Music Bot

![Node](https://img.shields.io/badge/Node.js-20-green)

![Railway](https://img.shields.io/badge/Deploy-Railway-purple)

![Telegraf](https://img.shields.io/badge/Telegram-Telegraf-blue)

![License](https://img.shields.io/badge/License-MIT-red)

# 🎵 Marbeque Music Bot

Telegram Music Bot yang dapat mencari lagu dari YouTube, mengunduh audio berkualitas tinggi dalam format MP3, menambahkan metadata beserta cover album, dan mengirimkannya langsung melalui Telegram.

## ✨ Fitur

- 🔍 Pencarian lagu dari YouTube
- 🎵 Download MP3 kualitas terbaik
- 🖼 Embed cover album
- 📝 Metadata (Judul, Artis, Album)
- ⚡ Dibangun menggunakan Telegraf
- ☁️ Siap dijalankan di Railway
- 💾 Cache pencarian lagu
- 🚀 Download otomatis menggunakan yt-dlp

---

## 📂 Struktur Project

```
BotMusicAssistant/
│
├── assets/
│   └── avatar.jpg
│
├── commands/
│   ├── start.js
│   └── music.js
│
├── services/
│   ├── youtube.js
│   ├── downloader.js
│   ├── metadata.js
│   └── cache.js
│
├── temp/
│
├── index.js
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

---

## 📦 Instalasi

Clone repository

```bash
git clone https://github.com/USERNAME/MarbequeMusic.git
```

Masuk ke folder project

```bash
cd MarbequeMusic
```

Install dependencies

```bash
npm install
```

---

## 🔑 Environment Variable

Buat file `.env`

```env
BOT_TOKEN=YOUR_BOT_TOKEN
```

---

## ▶ Menjalankan Bot

```bash
npm start
```

atau

```bash
node index.js
```

---

## ☁ Deploy ke Railway

1. Push project ke GitHub
2. Login ke Railway
3. New Project
4. Deploy from GitHub Repository
5. Pilih repository
6. Tambahkan Environment Variable

```
BOT_TOKEN
```

Deploy selesai.

---

## 📚 Teknologi

- Node.js
- Telegraf
- yt-search
- yt-dlp-wrap
- Node-ID3
- Axios

---

## 📄 Lisensi

MIT License

---

## 👨‍💻 Developer

Marbeque Studio

Telegram Music Bot v3.0