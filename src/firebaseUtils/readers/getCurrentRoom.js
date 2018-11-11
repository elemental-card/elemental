import firebase from "../firebase";
import getRoomStateFromRoomDoc from "../../businessLogic/getRoomStateFromRoomDoc";

const db = firebase.firestore();

export default async uid => {
  const hostedRoomDoc = await db.collection("rooms").get(uid);
  if (hostedRoomDoc.exists) {
    return getRoomStateFromRoomDoc(hostedRoomDoc);
  }

  const roomDocs = await db.collection("rooms").get();
  return (
    roomDocs.docs
      .map(getRoomStateFromRoomDoc)
      .find(r => r.players.some(p => p.uid === uid)) || null
  );
};
