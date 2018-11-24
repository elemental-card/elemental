import React from "react";
import ConfirmSection from "../components/ConfirmSection";
import TrumpSection from "../components/TrumpSection";
import Container from "../components/Container";
import Header from "../components/Header";
import BidTable from "../components/BidTable";
import Hand from "../components/Hand";

export default ({ hand, players, trumpCard, tentativeBid }) => [
  <ConfirmSection status="disabled" label="Continue" />,
  <TrumpSection card={trumpCard} />,
  <Container topLeft lightGrey>
    <Header>Waiting for opponents to bid...</Header>
    <BidTable players={players} tentativeBid={tentativeBid} />
  </Container>,
  <Container bottomLeft darkGrey>
    <Hand
      cards={hand}
      trumpElement={
        trumpCard === null || trumpCard.rank === 0 ? null : trumpCard.element
      }
    />
  </Container>,
];
