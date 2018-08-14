import firebase from '../firebase';

const db = firebase.firestore();

export default async (hostUid, action) => {
  const roomRef = db.collection('rooms').doc(hostUid);
  await db.runTransaction((transaction) => {
    return transaction.get(roomRef).then((roomDoc) => {
      const newActions = roomDoc.data().actions.concat([action]);
      transaction.update(roomRef, {
        actions: newActions,
      });
    });
  });
};
