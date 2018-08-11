import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import TrumpSection from '../components/TrumpSection';
import Container from '../components/Container';
import Header from '../components/Header';
import BidTable from '../components/BidTable';
import Hand from '../components/Hand';

export default ({
  hand,
  players,
  trumpCard,

  onContinue
}) => [
  <ConfirmSection
    isEnabled
    onClick={onContinue}
    label="Continue"
  />,
  <TrumpSection
    card={trumpCard}
  />,
  <Container topLeft lightGrey>
    <Header>Opponents have bid!</Header>
    <BidTable players={players} />
  </Container>,
  <Container bottomLeft darkGrey>
    <Hand cards={hand} trumpElement={trumpCard.element} />
  </Container>
];
