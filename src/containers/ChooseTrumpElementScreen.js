import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import TrumpSection from '../components/TrumpSection';
import Container from '../components/Container';
import Header from '../components/Header';
import TrumpElementOptions from '../components/TrumpElementOptions';
import Hand from '../components/Hand';

export default ({
  hand,
  tentativeElement,

  onSelectTentativeElement,
  onConfirmTentativeElement,
}) => [
  <ConfirmSection
    isEnabled={tentativeElement !== null}
    onClick={onConfirmTentativeElement}
    label="Confirm"
  />,
  <TrumpSection
    card={{
      rank: Infinity,
      element: tentativeElement || 'magic',
    }}
  />,
  <Container topLeft lightGrey>
    <Header>Choose trump element:</Header>
    <TrumpElementOptions
      tentativeElement={tentativeElement}
      onSelect={onSelectTentativeElement}
    />
  </Container>,
  <Container bottomLeft darkGrey>
    <Hand cards={hand} trumpElement={tentativeElement} />
  </Container>
];
