import firebase from "../firebase";
import version from "../../version";

const db = firebase.firestore();

export default async (hostUid, hostName) => {
  const roomRef = db.collection("rooms").doc(hostUid);
  try {
    await roomRef.set({
      hostName,
      actions: [],
      version,
    });
  } catch (unused) {
    await roomRef.delete();
    await roomRef.set({
      hostName,
      actions: [],
    });
  }
};
