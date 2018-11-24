import React from "react";
import Card from "./Card";
import { getWinnerIndex } from "../businessLogic/cardUtils";
import "../styles/CardTable.css";

export default ({ players, trumpElement, tentativeCard = null }) => {
  const winnerIndex =
    tentativeCard === null &&
    players.every(player => player.playedCard === null)
      ? -1
      : getWinnerIndex(
          players.filter(p => p.playedCard !== null).map(p => p.playedCard),
          trumpElement,
        );

  return (
    <div className="CardTable">
      <div className="CardTable__Row">
        {players.map((player, i) => (
          <div className="CardTable__PlayerLabel">
            {player.name}
            {i === winnerIndex && <div className="CardTable__WinIndicator" />}
          </div>
        ))}
      </div>

      <div className="CardTable__Row">
        {players.map(player =>
          player.playedCard === null ? null : (
            <Card
              card={player.playedCard}
              isTrump={player.playedCard.element === trumpElement}
            />
          ),
        )}
        {tentativeCard && (
          <Card
            card={tentativeCard}
            isTrump={tentativeCard.element === trumpElement}
          />
        )}
      </div>

      <div className="CardTable__Row">
        {players.map(player => (
          <div className="CardTable__PlayerLabel">
            {player.tricksWon}/{player.bid}
          </div>
        ))}
      </div>
    </div>
  );
};
