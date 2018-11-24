import firebase from "../firebase";
import getRoomStateFromRoomDoc from "../../businessLogic/getRoomStateFromRoomDoc";
import isVersionCompatible from "../../isVersionCompatible";

const db = firebase.firestore();

export default async uid => {
  const hostedRoomDoc = await db.collection("rooms").get(uid);
  if (hostedRoomDoc.exists) {
    const roomState = getRoomStateFromRoomDoc(hostedRoomDoc);
    return isVersionCompatible(roomState.version) ? roomState : null;
  }

  const roomDocs = await db.collection("rooms").get();
  return (
    roomDocs.docs
      .map(getRoomStateFromRoomDoc)
      .find(
        r =>
          r.players.some(p => p.uid === uid) && isVersionCompatible(r.version),
      ) || null
  );
};
