import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import TrumpSection from '../components/TrumpSection';
import Container from '../components/Container';
import Header from '../components/Header';
import List from '../components/List';
import ListItem from '../components/ListItem';
import PlacementIndicator from '../components/PlacementIndicator';

export default ({
  players,

  onContinue,
}) => [
  <ConfirmSection
    onClick={onContinue}
    isEnabled
    label="Continue"
  />,
  <TrumpSection card={null} />,
  <Container left lightGrey>
    <Header>Final scores:</Header>
    <List>
      {players.slice()
        .sort((a, b) => b.score - a.score)
        .map((player, i) => (
        <ListItem>
          <PlacementIndicator place={i + 1} />
          {player.name}: {player.score}
        </ListItem>
      ))}
    </List>
  </Container>
];
