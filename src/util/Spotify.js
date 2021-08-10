let userAccessToken;
const clientId = "447c9f46c7f14924b1029c7d7161d4b3";
const redirectUri = "http://localhost:3000/";

const Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken;
    }
    // check if access token is in the current URL (true if authorised by spotify & redirected)
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
    if (accessTokenMatch && expiresInMatch) {
      userAccessToken = accessTokenMatch[1]; // 1st item is full match, 2nd is the capturing group
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (userAccessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/"); // This clears the parameters, allowing us to grab a new access token when it expires.
      return userAccessToken;
    } else {
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  async search(searchTerm) {
    return fetch(
      `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {
          Authorization: "Bearer " + userAccessToken,
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((responseJSON) => {
        if (!responseJSON.tracks) {
          return [];
        }
        let tracksArray = responseJSON.tracks.items.map((item) => ({
          id: item.id,
          name: item.name,
          artist: item.artists[0].name,
          album: item.album.name,
          uri: item.uri,
        }));
        return tracksArray;
      });
  },
};

export default Spotify;
