const clientId = "49226d2c06274affb246ae398072af0f";
const redirectUri = "http://localhost:3000/";

const Spotify = {
    accessToken: "",

    /**
     * Retrieves the Spotify access token.
     * If not available, redirects to Spotify authorization.
     */
    getAccessToken() {
        if (this.accessToken) {
            return this.accessToken;
        }

        // Check if access token is in URL
        const urlParams = new URLSearchParams(window.location.hash.replace("#", "?"));
        const token = urlParams.get("access_token");
        const expiresIn = urlParams.get("expires_in");

        if (token) {
            this.accessToken = token;
            localStorage.setItem("spotify_access_token", token);
            setTimeout(() => (this.accessToken = ""), expiresIn * 1000);
            window.history.pushState("Access Token", null, "/"); // Remove token from URL
            return this.accessToken;
        }

        // If no token found, redirect to Spotify authorization
        const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
        window.location = authUrl;
    },

    /**
     * Searches for tracks on Spotify.
     * @param {string} term - The search query.
     * @returns {Promise<Array>} - An array of track objects.
     */
    async searchItem(term) {
        const token = this.getAccessToken();
        if (!token) return [];

        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const data = await response.json();
        if (!data.tracks) return [];

        return data.tracks.items.map(item => ({
            id: item.id,
            name: item.name,
            artist: item.artists[0].name,
            album: item.album.name,
            uri: item.uri
        }));
    },

    /**
     * Saves a playlist to the user's Spotify account.
     * @param {string} name - The name of the playlist.
     * @param {Array<string>} trackUris - The track URIs to add.
     * @returns {Promise<void>}
     */
    async savePlaylist(name, trackUris) {
        if (!name || trackUris.length === 0) return;

        const token = this.getAccessToken();
        if (!token) return;

        const headers = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        };

        // Get User ID
        const userResponse = await fetch("https://api.spotify.com/v1/me", { headers });
        const userData = await userResponse.json();
        if (!userData.id) return;

        // Create Playlist
        const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userData.id}/playlists`, {
            method: "POST",
            headers,
            body: JSON.stringify({ name })
        });

        const playlistData = await playlistResponse.json();
        if (!playlistData.id) return;

        // Add Tracks to Playlist
        await fetch(`https://api.spotify.com/v1/playlists/${playlistData.id}/tracks`, {
            method: "POST",
            headers,
            body: JSON.stringify({ uris: trackUris })
        });
    }
};

export default Spotify;