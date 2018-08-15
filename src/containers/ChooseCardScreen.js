import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import TrumpSection from '../components/TrumpSection';
import Container from '../components/Container';
import CardTable from '../components/CardTable';
import Hand from '../components/Hand';

export default ({
  hand,
  players,
  trumpCard,
  tentativeCardIndex,
  isPending,

  onSelectTentativeCardIndex,
  onConfirmTentativeCardIndex,
}) => [
  <ConfirmSection
    status={
      isPending
        ? 'pending'
        : tentativeCardIndex !== -1 ? 'enabled' : 'disabled'
    }
    onClick={onConfirmTentativeCardIndex}
    label="Confirm"
  />,
  <TrumpSection
    card={trumpCard}
  />,
  <Container topLeft lightGrey>
    <CardTable
      players={players}
      trumpElement={trumpCard.element}
      tentativeCard={
        tentativeCardIndex === -1 ? null : hand[tentativeCardIndex]
      }
    />
  </Container>,
  <Container bottomLeft darkGrey>
    <Hand
      cards={hand}
      selectedCardIndex={tentativeCardIndex}
      trumpElement={trumpCard.element}
      playedCards={
        players.filter(p => p.playedCard !== null)
          .map(p => p.playedCard)
      }
      onSelectIndex={onSelectTentativeCardIndex}
    />
  </Container>
];
