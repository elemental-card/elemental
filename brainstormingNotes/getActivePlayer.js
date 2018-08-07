const getActivePlayer = (currState) => {
  if (currState.type === 'CHOOSING_TRUMP') {
    return currState.players[currState.players.length - 1].name;
  }
  if (currState.type === 'BIDDING') {
    return currState.players.find(p => p.bid === null).name;
  }
  if (currState.type === 'CHOOSING_CARD') {
    return currState.players.find(p => p.playedCard === null).name;
  }
  if (currState.type === 'FINAL') {
    return null;
  }
  throw new TypeError('Cannot get active player due to illegal state type.');
};

export default getActivePlayer;
