import getNextGameState from "./getNextGameState";
import {
  getCardCodeFromCard,
  getCardFromCardCode,
  canCardBePlayed,
} from "./cardUtils";
import getActivePlayerName from "./getActivePlayerName";
import getInitGameState from "./getInitGameState";

export default roomDoc => {
  const hostUid = roomDoc.id;
  const { actions, hostName, version } = roomDoc.data();
  return actions.reduce(
    (roomState, action) => {
      if (
        roomState.type === "PREGAME" &&
        action.type === "JOIN" &&
        roomState.players.length < 6 &&
        /^\w{1,3}$/.test(action.name) &&
        roomState.players.every(p => p.name !== action.name) &&
        roomState.players.every(p => p.uid !== action.author)
      ) {
        return {
          ...roomState,
          players: roomState.players.concat([
            {
              uid: action.author,
              name: action.name,
            },
          ]),
        };
      }

      if (roomState.type === "PREGAME" && action.type === "LEAVE") {
        return {
          ...roomState,
          players: roomState.players.filter(p => p.uid !== action.author),
        };
      }

      if (
        roomState.type === "PREGAME" &&
        action.type === "HOST_START" &&
        roomState.players.find(p => p.uid === action.author) &&
        roomState.players.find(p => p.uid === action.author).name ===
          roomState.hostName &&
        roomState.players.length >= 3 &&
        Array.isArray(action.prngState) &&
        action.prngState.length === 4 &&
        action.prngState.every(n => n === ~~n)
      ) {
        return {
          type: "GAME",
          hostName: roomState.hostName,
          players: roomState.players,
          gameState: getInitGameState(
            action.prngState,
            roomState.players.map(p => p.name),
          ),
        };
      }

      if (
        roomState.type === "GAME" &&
        action.type === "CHOOSE_TRUMP_ELEMENT" &&
        roomState.gameState.type === "CHOOSING_TRUMP" &&
        roomState.players.find(p => p.uid === action.author) &&
        roomState.players.find(p => p.uid === action.author).name ===
          getActivePlayerName(roomState.gameState)
      ) {
        return {
          ...roomState,
          gameState: getNextGameState(roomState.gameState, action.element),
        };
      }

      if (
        roomState.type === "GAME" &&
        action.type === "CHOOSE_BID" &&
        roomState.gameState.type === "BIDDING" &&
        roomState.players.find(p => p.uid === action.author) &&
        roomState.players.find(p => p.uid === action.author).name ===
          getActivePlayerName(roomState.gameState)
      ) {
        return {
          ...roomState,
          gameState: getNextGameState(roomState.gameState, action.bid),
        };
      }

      if (
        roomState.type === "GAME" &&
        action.type === "CHOOSE_CARD" &&
        roomState.gameState.type === "CHOOSING_CARD" &&
        roomState.players.find(p => p.uid === action.author) &&
        roomState.players.find(p => p.uid === action.author).name ===
          getActivePlayerName(roomState.gameState) &&
        roomState.gameState.players
          .find(
            p =>
              p.name ===
              roomState.players.find(p => p.uid === action.author).name,
          )
          .hand.map(getCardCodeFromCard)
          .includes(action.cardCode) &&
        canCardBePlayed(
          getCardFromCardCode(action.cardCode),
          roomState.gameState.players
            .filter(p => p.playedCard !== null)
            .map(p => p.playedCard),
          roomState.gameState.players.find(
            p =>
              p.name ===
              roomState.players.find(p => p.uid === action.author).name,
          ).hand,
        )
      ) {
        return {
          ...roomState,
          gameState: getNextGameState(
            roomState.gameState,
            getCardFromCardCode(action.cardCode),
          ),
        };
      }

      console.log("illegal action: ", action, roomState);
      return roomState;
    },
    {
      type: "PREGAME",
      hostName,
      hostUid,
      players: [
        {
          uid: hostUid,
          name: hostName,
        },
      ],
      version,
    },
  );
};
