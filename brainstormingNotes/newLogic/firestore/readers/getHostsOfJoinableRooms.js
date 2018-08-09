import getRoomStateFromRoomDoc from '../../businessLogic/getRoomStateFromRoomDoc';

export default async () => {
  const roomDocs = await db.collection('rooms').get();
  return roomDocs
    .map(getRoomStateFromRoomDoc)
    .filter(r => r.type === 'PREGAME' && r.players.length < 6)
    .map(r => ({ uid: r.hostUid, name: r.hostName }));
};
