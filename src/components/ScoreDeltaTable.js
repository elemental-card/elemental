import React from 'react';
import '../styles/ScoreDeltaTable.css';

export default ({ players, scoreDeltas }) => (
  <div className="ScoreDeltaTable">
    <div className="ScoreDeltaTable__Row">
      {players.map((player) => (
        <div className="ScoreDeltaTable__Name">{player.name}</div>
      ))}
    </div>

    <div className="ScoreDeltaTable__Row">
      {players.map((player) => (
        <div className="ScoreDeltaTable__Score">{player.score}</div>
      ))}
    </div>

    <div className="ScoreDeltaTable__Row">
      {scoreDeltas.map((delta, i) => (
        <div className="ScoreDeltaTable__ScoreBreakdown">
          {players[i].score - delta}
          {
            delta < 0
              ? (
                <span
                  className="ScoreDeltaTable__ScoreDelta ScoreDeltaTable__ScoreDelta--negative"
                >
                  {' -' + -delta}
                </span>
              )
              : (
                <span
                  className="ScoreDeltaTable__ScoreDelta ScoreDeltaTable__ScoreDelta--positive"
                >
                  {' +' + delta}
                </span>
              )
          }
        </div>
      ))}
    </div>
  </div>
);
