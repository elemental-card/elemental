import React from 'react';
import ConfirmSection from '../components/ConfirmSection';
import TrumpSection from '../components/TrumpSection';
import Container from '../components/Container';
import Header from '../components/Header';
import List from '../components/List';
import ListItem from '../components/ListItem';
import PlacementIndicator from '../components/PlacementIndicator';
import '../styles/HandResultScreen.css';

export default ({
  playerScoreBreakdowns,
  trumpCard,

  onContinue,
}) => [
  <ConfirmSection
    status="enabled"
    onClick={onContinue}
    label="Continue"
  />,
  <TrumpSection card={trumpCard} />,
  <Container left lightGrey>
    <Header>Round results:</Header>
    <List>
      {playerScoreBreakdowns.slice()
        .sort((a, b) => b.score - a.score)
        .map((player, i, sortedPlayers) => {
          let j = i;
          while (j > 0 && sortedPlayers[j - 1].score === player.score) {
            j--;
          }
          return (
            <ListItem>
              <PlacementIndicator place={j + 1} />
              {player.name}: {player.score}
              {' '}
              <span className="HandResultScreen__ScoreBreakdown">
                (
                {player.score - player.delta}
                {
                  player.delta < 0
                    ? (
                      <span
                        className="HandResultScreen__ScoreDelta HandResultScreen__ScoreDelta--negative"
                      >
                        {' -' + -player.delta}
                      </span>
                    )
                    : (
                      <span
                        className="HandResultScreen__ScoreDelta HandResultScreen__ScoreDelta--positive"
                      >
                        {' +' + player.delta}
                      </span>
                    )
                }
                )
              </span>
            </ListItem>
          );
        })}
    </List>
  </Container>
];
