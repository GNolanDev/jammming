import "./TrackList.css";
import React from "react";

export class TrackList extends React.Component {
  render() {
    const tracks = this.props.tracks;
    const arrayOfTracks = tracks.map((track) => (
      <Track track={track} key={track.id} />
    ));
    return <div>{arrayOfTracks}</div>;
  }
}
