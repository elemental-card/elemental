import React from 'react';
import IncrementBidSection from '../components/IncrementBidSection';
import DecrementBidSection from '../components/DecrementBidSection';
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
  tentativeBid,

  onSelectTentativeBid,
  onConfirmTentativeBid,
}) => {
  const maxBid = players[0].hand.length;
  const safelyIncrementBid = () => {
    if (tentativeBid < maxBid) {
      onSelectTentativeBid(tentativeBid + 1);
    }
  };
  const safelyDecrementBid = () => {
    if (tentativeBid > 0) {
      onSelectTentativeBid(tentativeBid - 1);
    }
  };
  return [
    <IncrementBidSection onClick={safelyIncrementBid} />,
    <DecrementBidSection onClick={safelyDecrementBid} />,
    <ConfirmSection
      status="enabled"
      onClick={onConfirmTentativeBid}
      label="Confirm"
    />,
    <TrumpSection
      card={trumpCard}
    />,
    <Container topCenter lightGrey>
      <Header>Make your bid:</Header>
      <BidTable players={players} tentativeBid={tentativeBid} />
    </Container>,
    <Container bottomCenter darkGrey>
      <Hand cards={hand} trumpElement={trumpCard.element} />
    </Container>
  ];
}
