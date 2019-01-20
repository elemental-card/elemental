import React from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import List from "../components/List";
import ListItem from "../components/ListItem";
import PlacementIndicator from "../components/PlacementIndicator";

export default ({ top, players }) => [
  <Container top={top} fullscreen lightGrey>
    <Header>Scores:</Header>
    <List>
      {players
        .slice()
        .sort((a, b) => b.score - a.score)
        .map((player, i, sortedPlayers) => {
          let j = i;
          while (j > 0 && sortedPlayers[j - 1].score === player.score) {
            j--;
          }
          return (
            <ListItem>
              <PlacementIndicator place={j + 1} />
              {player.name}: {player.score}
            </ListItem>
          );
        })}
    </List>
  </Container>,
];
