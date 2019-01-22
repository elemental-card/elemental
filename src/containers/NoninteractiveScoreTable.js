import React from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import List from "../components/List";
import ListItem from "../components/ListItem";
import PlacementIndicator from "../components/PlacementIndicator";

export default ({ top, players }) => [
  <Container top={top} fullscreen lightGrey>
    <Header>Current round: {roundNumberFromPlayers(players)}</Header>
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

const roundNumberFromPlayers = players => {
  const totalTricksWon = players
    .map(p => p.tricksWon || 0)
    .reduce((a, b) => a + b);
  if (totalTricksWon === 60 / players) {
    return totalTricksWon;
  } else {
    return totalTricksWon + Math.max(...players.map(p => p.hand.length));
  }
};
