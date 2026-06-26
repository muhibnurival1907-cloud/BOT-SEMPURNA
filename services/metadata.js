const NodeID3 = require("node-id3");
const axios = require("axios");
const fs = require("fs");
const path = require("path");

module.exports = async function (song, mp3Path) {

    try {

        let image = undefined;

        // Download thumbnail jika tersedia
        if (song.thumbnail) {

            const response = await axios({
                url: song.thumbnail,
                method: "GET",
                responseType: "arraybuffer",
                timeout: 15000
            });

            image = {
                mime: "image/jpeg",
                type: {
                    id: 3,
                    name: "front cover"
                },
                description: "Cover",
                imageBuffer: Buffer.from(response.data)
            };
        }

        const tags = {
            title: song.title || "Unknown Title",
            artist: song.author || "Unknown Artist",
            album: "Marbeque Music",
            performerInfo: song.author || "Unknown Artist",
            comment: {
                language: "eng",
                text: "Downloaded by Marbeque Music Bot"
            }
        };

        // Tambahkan cover jika berhasil diunduh
        if (image) {
            tags.image = image;
        }

        NodeID3.write(tags, mp3Path);

        console.log("✅ Metadata berhasil ditambahkan");

    } catch (err) {

        console.error("❌ Metadata gagal:", err.message);

    }

};