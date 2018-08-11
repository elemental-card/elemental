import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import TrumpSection from '../components/TrumpSection';
import Container from '../components/Container';
import Header from '../components/Header';
import Hand from '../components/Hand';

export default ({
  hand,
}) => [
  <ConfirmSection
    label="Continue"
    isEnabled={false}
  />,
  <TrumpSection
    card={{
      rank: Infinity,
      element: 'magic',
    }}
  />,
  <Container topLeft lightGrey>
    <Header>Waiting for dealer to choose trump element...</Header>
  </Container>,
  <Container bottomLeft darkGrey>
    <Hand cards={hand} trumpElement={null} />
  </Container>
];
