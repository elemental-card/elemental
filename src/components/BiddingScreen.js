import React from 'react';
import getElementOfTrump from '../gameLogic/getElementOfTrump';
import getDisplayCardOfTrump from '../gameLogic/getDisplayCardOfTrump';

import PlayerLabel from './PlayerLabel';
import Card from './Card';

const BiddingScreen = ({
  ownName,
  gameState,
  tentativeBid,

  editTentativeBid,
  confirmTentativeBid,
}) => {
  const trumpElement = getElementOfTrump(gameState.trump);
  const trumpDisplayCard = getDisplayCardOfTrump(gameState.trump);
  const ownHand = gameState.players.find(p => p.name === ownName).hand;
  const roundNumber = gameState.players[0].hand.length;

  return (
    <div>
      <div className="CardTable">
        <div className="CardTable__NameList">
          <PlayerLabel>Trump</PlayerLabel>
          {gameState.players.map((player) => {
            return (
              <PlayerLabel>{player.name}</PlayerLabel>
            );
          })}
        </div>

        <div className="CardTable__CardList">
          <Card rank={trumpDisplayCard.rank} element={trumpDisplayCard.element} isTrump />
        </div>

        <div className="CardTable__TrickList">
          <PlayerLabel />
          {gameState.players.map((player) => {
            return (
              <PlayerLabel>{player.bid === null ? '?' : player.bid}/{roundNumber}</PlayerLabel>
            );
          })}
        </div>
      </div>

      <div className="Hand">
        <div className="Hand__CardList">
          {ownHand.map((card, i) => {
            return (
              <Card element={card.element} rank={card.rank} isTrump={card.element === trumpElement} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BiddingScreen;
