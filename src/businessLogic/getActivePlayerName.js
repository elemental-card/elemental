const getActivePlayerName = gameState => {
  if (gameState.type === "CHOOSING_TRUMP") {
    return gameState.players[gameState.players.length - 1].name;
  }
  if (gameState.type === "BIDDING") {
    return gameState.players.find(p => p.bid === null).name;
  }
  if (gameState.type === "CHOOSING_CARD") {
    return gameState.players.find(p => p.playedCard === null).name;
  }
  if (gameState.type === "FINAL") {
    return null;
  }
  throw new TypeError("Cannot get active player due to illegal state type.");
};

export default getActivePlayerName;
