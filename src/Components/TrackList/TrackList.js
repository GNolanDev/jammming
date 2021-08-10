import "./TrackList.css";
import React from "react";

export class TrackList extends React.Component {
  render() {
    const tracks = this.props.tracks;
    const arrayOfTracks = tracks.map((track) => (
      <Track
        track={track}
        key={track.id}
        onAdd={this.props.onAdd}
        onRemove={this.props.onRemove}
        isRemoval={this.props.isRemoval}
      />
    ));
    return <div>{arrayOfTracks}</div>;
  }
}
