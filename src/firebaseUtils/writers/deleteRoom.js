import firebase from '../firebase';

const db = firebase.firestore();

export default async (hostUid) => {
  await db.collection('rooms').doc(hostUid).delete();
};
