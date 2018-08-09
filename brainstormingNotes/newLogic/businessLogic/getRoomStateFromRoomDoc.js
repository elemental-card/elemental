import getNextGameState from './getNextGameState';
import getCardFromCardCode from './getCardFromCardCode';
import getActivePlayerName from './getActivePlayerName';

export default (roomDoc) => {
  const hostUid = roomDoc.id;
  const { actions, hostName } = roomDoc.data();
  return actions.reduce((roomState, action) => {
    if (
      roomState.type === 'PREGAME'
      && action.type === 'JOIN'
      && roomState.players.length < 6
      && /^\w{1,3}$/.test(action.name)
      && roomState.players.every(p => p.name !== action.name)
      && roomState.players.every(p => p.uid !== action.author)
    ) {
      return {
        ...roomState,
        players: roomState.players.concat([{
          uid: action.author,
          name: action.name,
        }]),
      };
    }

    if (
      roomState.type === 'PREGAME'
      && action.type === 'LEAVE'
    ) {
      return {
        ...roomState,
        players: roomState.players.filter(p => p.uid !== action.author),
      };
    }

    if (
      roomState.type === 'PREGAME'
      && action.type === 'HOST_START'
      && roomState.players.length >= 2
      && Array.isArray(action.prngState)
      && action.prngState.length === 4
      && action.prngState.every(n => n === ~~n)
    ) {
      return {
        type: 'GAME',
        players: roomState.players,
        gameState: TODO,
      };
    }

    if (
      roomState.type === 'GAME'
      && action.type === 'CHOOSE_TRUMP_ELEMENT'
      && roomState.gameState.type === 'CHOOSING_TRUMP'
      && roomState.players.find(p => p.uid === action.author)
      && roomState.players.find(p => p.uid === action.author).name === getActivePlayerName(roomState.gameState)
    ) {
      return {
        ...roomState,
        gameState: getNextGameState(roomState.gameState, action.element),
      };
    }

    if (
      roomState.type === 'GAME'
      && action.type === 'CHOOSE_BID'
      && roomState.gameState.type === 'BIDDING'
      && roomState.players.find(p => p.uid === action.author)
      && roomState.players.find(p => p.uid === action.author).name === getActivePlayerName(roomState.gameState)
    ) {
      return {
        ...roomState,
        gameState: getNextGameState(roomState.gameState, action.bid),
      };
    }

    if (
      roomState.type === 'GAME'
      && action.type === 'CHOOSE_CARD'
      && roomState.gameState.type === 'CHOOSING_CARD'
      && roomState.players.find(p => p.uid === action.author)
      && roomState.players.find(p => p.uid === action.author).name === getActivePlayerName(roomState.gameState)
    ) {
      return {
        ...roomState,
        gameState: getNextGameState(roomState.gameState, getCardFromCardCode(action.cardCode)),
      };
    }

    return roomState;
  }, {
    type: 'PREGAME',
    hostName,
    players: [
      {
        uid: hostUid,
        name: hostName,
      }
    ],
  });
};
