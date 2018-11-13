import firebase from "../firebase";
import getRoomStateFromRoomDoc from "../../businessLogic/getRoomStateFromRoomDoc";
import appendAction from "./appendAction";

const db = firebase.firestore();

export default async (hostUid, guestUid, guestName) => {
  const roomDoc = await db
    .collection("rooms")
    .doc(hostUid)
    .get();
  const roomState = getRoomStateFromRoomDoc(roomDoc);
  if (roomState.players.some(p => p.name === guestName)) {
    return false;
  }
  await appendAction(hostUid, {
    type: "JOIN",
    author: guestUid,
    name: guestName,
  });
  return true;
};
