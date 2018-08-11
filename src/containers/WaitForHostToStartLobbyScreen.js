import React from 'react';
import WaitingSection from '../components/WaitingSection';
import BackSection from '../components/BackSection';
import Container from '../components/Container';
import Header from '../components/Header';
import List from '../components/List';
import ListItem from '../components/ListItem';

export default ({
  players,

  onLeave,
}) => [
  <WaitingSection label="Waiting for host to start game..."/>,
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
