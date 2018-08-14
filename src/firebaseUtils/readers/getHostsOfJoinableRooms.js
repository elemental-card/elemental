import firebase from '../firebase';
import getRoomStateFromRoomDoc from '../../businessLogic/getRoomStateFromRoomDoc';

const db = firebase.firestore();

export default async () => {
  const roomDocs = await db.collection('rooms').get();
  return roomDocs.docs
    .map(getRoomStateFromRoomDoc)
    .filter(r => r.type === 'PREGAME' && r.players.length < 6)
    .map(r => ({ uid: r.hostUid, name: r.hostName }));
};
