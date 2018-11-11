import React from "react";
import ChooseTrumpElementScreen from "../containers/ChooseTrumpElementScreen";

const SAMPLE_HAND = [
  {
    rank: 2,
    element: "earth",
  },
  {
    rank: 11,
    element: "water",
  },
  {
    rank: 6,
    element: "fire",
  },
  {
    rank: 0,
    element: "magic",
  },
];

export default class extends React.Component {
  constructor() {
    super();

    this.state = {
      tentativeElement: null,
    };
  }

  render() {
    return (
      <ChooseTrumpElementScreen
        hand={SAMPLE_HAND}
        tentativeElement={this.state.tentativeElement}
        onSelectTentativeElement={tentativeElement =>
          this.setState({ tentativeElement })
        }
        onConfirmTentativeElement={() =>
          alert("Confirmed " + this.state.tentativeElement)
        }
      />
    );
  }
}
