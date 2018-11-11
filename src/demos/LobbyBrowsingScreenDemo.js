import React from "react";
import LobbyBrowsingScreen from "../containers/LobbyBrowsingScreen";

const hostsOfLobbies = [
  {
    name: "Bob",
    uid: "123",
  },
  {
    name: "_X_",
    uid: "697",
  },
  {
    name: "j0e",
    uid: "999",
  },
];

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      tentativePlayer: null,
    };
  }

  render() {
    return (
      <LobbyBrowsingScreen
        hostsOfLobbies={hostsOfLobbies}
        tentativePlayer={this.state.tentativePlayer}
        onSelectTentativePlayer={tentativePlayer =>
          this.setState({ tentativePlayer })
        }
        onConfirmTentativePlayer={() =>
          alert("Confirmed " + this.state.tentativePlayer.name)
        }
        onBack={() => alert("Back.")}
      />
    );
  }
}
