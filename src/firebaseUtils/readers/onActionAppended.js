import firebase from "../firebase";
import getRoomStateFromRoomDoc from "../../businessLogic/getRoomStateFromRoomDoc";

const db = firebase.firestore();

export default (hostUid, callback) => {
  const roomRef = db.collection("rooms").doc(hostUid);
  return roomRef.onSnapshot(roomDoc => {
    if (roomDoc.exists) {
      callback(true, getRoomStateFromRoomDoc(roomDoc));
    } else {
      callback(false, null);
    }
  });
};
