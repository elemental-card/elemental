import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import BackSection from '../components/BackSection';
import Container from '../components/Container';
import Header from '../components/Header';
import List from '../components/List';
import ListItem from '../components/ListItem';

export default ({
  players,
  status,

  onStart,
  onLeave,
}) => [
  <ConfirmSection
    status={
      status === 'starting'
        ? 'pending'
        : players.length >= 3 ? 'enabled' : 'disabled'
    }
    onClick={onStart}
    label="Start Game"
  />,
  <BackSection
    status={status === 'leaving' ? 'pending' : 'enabled'}
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
