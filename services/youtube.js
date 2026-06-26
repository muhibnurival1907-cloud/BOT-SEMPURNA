const yts = require("yt-search");

async function searchMusic(query) {

    const result = await yts(query);

    return result.videos
        .filter(video => video.seconds <= 900)
        .slice(0,5)
        .map(video => ({

            title: video.title,

            author: video.author.name,

            url: video.url,

            videoId: video.videoId,

            duration: video.timestamp,

            seconds: video.seconds,

            views: video.views,

            thumbnail: video.thumbnail,

            uploadedAt: video.ago

        }));

}

module.exports = {

    searchMusic

};