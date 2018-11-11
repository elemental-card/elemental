import React from "react";
import ConfirmSection from "../components/ConfirmSection";
import TrumpSection from "../components/TrumpSection";
import Container from "../components/Container";
import Header from "../components/Header";
import Hand from "../components/Hand";

export default ({
  hand,
  trumpElement,

  onContinue,
}) => [
  <ConfirmSection status="enabled" onClick={onContinue} label="Continue" />,
  <TrumpSection
    card={{
      rank: Infinity,
      element: trumpElement,
    }}
  />,
  <Container topLeft lightGrey>
    <Header>Dealer has chosen trump element!</Header>
  </Container>,
  <Container bottomLeft darkGrey>
    <Hand cards={hand} trumpElement={trumpElement} />
  </Container>,
];
