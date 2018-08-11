import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import BackSection from '../components/BackSection';
import Container from '../components/Container';
import Header from '../components/Header';
import List from '../components/List';
import ListItem from '../components/ListItem';

export default ({
  players,

  onStart,
  onLeave,
}) => [
  <ConfirmSection
    isEnabled={players.length >= 3}
    onClick={onStart}
    label="Start Game"
  />,
  <BackSection
    onClick={onLeave}
    label="Leave"
  />,
  <Container left lightGrey>
    <Header>Players:</Header>
    <List>
      {players.map((player) => (
        <ListItem>{player.name}</ListItem>
      ))}
    </List>
  </Container>
];
