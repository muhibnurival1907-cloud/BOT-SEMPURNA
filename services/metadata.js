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

        // ==========================
        // Download Cover
        // ==========================

        if (song.thumbnail) {

            try {

                const response = await axios({

                    url: song.thumbnail,

                    method: "GET",

                    responseType: "arraybuffer",

                    timeout: 15000

                });

                const mime =
                    response.headers["content-type"] || "image/jpeg";

                const imageBuffer = Buffer.from(response.data);

                console.log(
                    `🖼 Cover: ${(imageBuffer.length / 1024).toFixed(0)} KB`
                );

                // Hindari cover terlalu besar
                if (imageBuffer.length < 1024 * 1024) {

                    tags.image = {

                        mime,

                        type: {

                            id: 3,

                            name: "front cover"

                        },

                        description: "Album Cover",

                        imageBuffer

                    };

                } else {

                    console.log("⚠ Cover terlalu besar, dilewati.");

                }

            } catch (err) {

                console.warn("⚠ Thumbnail gagal diunduh:", err.message);

            }

        }

        // ==========================
        // Update Metadata
        // ==========================

        const success = NodeID3.update(tags, mp3Path);

        if (success) {

            console.log("✅ Metadata berhasil diperbarui");

        } else {

            console.log("⚠ Metadata gagal diperbarui");

        }

    } catch (err) {

        console.error("❌ Metadata Error:", err.message);

    }

};