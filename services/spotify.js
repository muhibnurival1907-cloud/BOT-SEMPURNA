const SpotifyWebApi = require("spotify-web-api-node");

const spotify = new SpotifyWebApi({
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET
});

async function login() {

    const data = await spotify.clientCredentialsGrant();

    spotify.setAccessToken(
        data.body.access_token
    );

}

async function search(query) {

    const result = await spotify.searchTracks(query, {
        limit: 10
    });

    return result.body.tracks.items.map(track => ({

        id: track.id,

        title: track.name,

        artist: track.artists
            .map(a => a.name)
            .join(", "),

        album: track.album.name,

        thumbnail:
            track.album.images[0]?.url

    }));

}

module.exports = {

    login,

    search

};