import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import TrumpSection from '../components/TrumpSection';
import Container from '../components/Container';
import Header from '../components/Header';
import ScoreDeltaTable from '../components/ScoreDeltaTable';
// TODO refactor props
export default ({
  players,
  scoreDeltas,
  trumpCard,

  onContinue
}) => [
  <ConfirmSection
    status="enabled"
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
