import loginAnonymously from "./auth/loginAnonymously";

import getCurrentRoom from "./readers/getCurrentRoom";
import getHostsOfJoinableRooms from "./readers/getHostsOfJoinableRooms";
import onActionAppended from "./readers/onActionAppended";

import appendAction from "./writers/appendAction";
import chooseBid from "./writers/chooseBid";
import chooseCard from "./writers/chooseCard";
import chooseTrumpElement from "./writers/chooseTrumpElement";
import createRoom from "./writers/createRoom";
import deleteRoom from "./writers/deleteRoom";
import joinRoom from "./writers/joinRoom";
import leaveRoom from "./writers/leaveRoom";
import startRoom from "./writers/startRoom";

export default {
  loginAnonymously,

  getCurrentRoom,
  getHostsOfJoinableRooms,
  onActionAppended,

  appendAction,
  chooseBid,
  chooseCard,
  chooseTrumpElement,
  createRoom,
  deleteRoom,
  joinRoom,
  leaveRoom,
  startRoom,
};
