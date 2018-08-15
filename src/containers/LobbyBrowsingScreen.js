import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import BackSection from '../components/BackSection';
import Container from '../components/Container';
import Header from '../components/Header';
import List from '../components/List';
import ListItem from '../components/ListItem';

export default ({
  hostsOfLobbies,
  tentativePlayer,

  onSelectTentativePlayer,
  onConfirmTentativePlayer,
  onBack,
}) => [
  <ConfirmSection
    status={tentativePlayer !== null ? 'enabled' : 'disabled'}
    onClick={onConfirmTentativePlayer}
    label="Confirm"
  />,
  <BackSection
    status="enabled"
    onClick={onBack}
    label="Home"
  />,
  <Container left lightGrey>
    <Header>Select a lobby</Header>
    <List>
      {hostsOfLobbies.map((host) => {
        return (
          <ListItem
            onClick={() => onSelectTentativePlayer(host)}
            isSelected={tentativePlayer && tentativePlayer.uid === host.uid}
          >
            {host.name}
          </ListItem>
        );
      })}
    </List>
  </Container>
];
