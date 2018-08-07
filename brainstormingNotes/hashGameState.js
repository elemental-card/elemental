import shajs from 'sha.js';

const hashGameState = (currState) => {
  let str = '';
  if (currState.type === 'CHOOSING_TRUMP') {
    str += 'CHOOSING_TRUMP,[' + currState.prngState.join(',') + '];';
    for (const player of currState.players) {
      str += player.name + ',' + player.score + ',[' + player.hand.join(',') + '];';
    }
  } else if (currState.type === 'BIDDING') {
    str += 'BIDDING,[' + currState.prngState.join(',') + '],' + JSON.stringify(currState.trump, stringifyInfinity) + ';';
    for (const player of currState.players) {
      str += player.name + ',' + player.score + ',[' + player.hand.join(',') + '],' + player.bid + ';';
    }
  } else if (currState.type === 'CHOOSING_CARD') {
    str += 'CHOOSING_CARD,[' + currState.prngState.join(',') + '],' + JSON.stringify(currState.trump, stringifyInfinity) + ',' + currState.nextDealer + ';';
    for (const player of currState.players) {
      str += player.name + ',' + player.score + ',[' + player.hand.join(',') + '],' + player.bid + ',' + player.tricksWon + ',' + JSON.stringify(player.playedCard, stringifyInfinity) + ';'
    }
  } else if (currState.type === 'FINAL') {
    str += 'FINAL,[' + currState.prngState.join(',') + '];';
    for (const player of currState.players) {
      str += player.name + ',' + player.score + ';';
    }
  } else {
    throw new TypeError('Cannot hash game state due to illegal state type.');
  }
  return shajs('sha256').update(str).digest(hex);
};

const stringifyInfinity = (key, value) => {
  if (value === Infinity) {
    return 'Infinity';
  }
  return value;
};

export default hashGameState;
