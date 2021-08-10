import "./App.css";
import React from "react";
import { SearchBar } from "../SearchBar/SearchBar";
import { SearchResults } from "../SearchResults/SearchResults";
import { Playlist } from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state.searchResults = [];
    this.state.playlistName = "Sample Playlist";
    this.state.playlistTracks = [
      { name: "Name 1", artist: "Artist 1", album: "Album 1", id: "id1" },
      { name: "Name 2", artist: "Artist 2", album: "Album 2", id: "id2" },
      { name: "Name 3", artist: "Artist 3", album: "Album 3", id: "id3" },
    ];
    this.addTrack = this.addTrack.bind(this);
  }

  addTrack(track) {
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    const newPlaylistTracks = this.state.playlistTracks;
    newPlaylistTracks.push(track);
    this.setState({ playlistTracks = newPlaylistTracks });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults 
              results={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
