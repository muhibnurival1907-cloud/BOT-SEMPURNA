const NodeID3 = require("node-id3");
const axios = require("axios");

module.exports = async function (song, mp3Path) {

    try {

        const tags = {
            title: song.title || "Unknown Title",
            artist: song.author || "Unknown Artist",
            album: "Marbeque Music",
            albumArtist: song.author || "Unknown Artist",
            performerInfo: song.author || "Unknown Artist",
            publisher: "Marbeque Music",
            genre: "Music",
            year: new Date().getFullYear().toString(),
            comment: {
                language: "eng",
                text: "Downloaded by Marbeque Music Bot"
            }
        };

        // Download thumbnail jika tersedia
        if (song.thumbnail) {

            try {

                const response = await axios({
                    url: song.thumbnail,
                    method: "GET",
                    responseType: "arraybuffer",
                    timeout: 15000
                });

                tags.image = {
                    mime: "image/jpeg",
                    type: {
                        id: 3,
                        name: "front cover"
                    },
                    description: "Album Cover",
                    imageBuffer: Buffer.from(response.data)
                };

            } catch (err) {

                console.warn("Thumbnail gagal diunduh:", err.message);

            }

        }

        NodeID3.write(tags, mp3Path);

        console.log("✅ Metadata berhasil ditambahkan");

    } catch (err) {

        console.error("❌ Metadata gagal:", err.message);

    }

};