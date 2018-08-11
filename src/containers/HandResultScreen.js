import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import TrumpSection from '../components/TrumpSection';
import Container from '../components/Container';
import Header from '../components/Header';
import ScoreDeltaTable from '../components/ScoreDeltaTable';

export default ({
  players,
  scoreDeltas,
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
  <Container left lightGrey>
    <Header>Scores:</Header>
    <ScoreDeltaTable players={players} scoreDeltas={scoreDeltas} />
  </Container>
];
