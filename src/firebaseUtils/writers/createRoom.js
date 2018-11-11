import firebase from "../firebase";

const db = firebase.firestore();

export default async (hostUid, hostName) => {
  const roomRef = db.collection("rooms").doc(hostUid);
  try {
    await roomRef.set({
      hostName,
      actions: [],
    });
  } catch (unused) {
    await roomRef.delete();
    await roomRef.set({
      hostName,
      actions: [],
    });
  }
};
