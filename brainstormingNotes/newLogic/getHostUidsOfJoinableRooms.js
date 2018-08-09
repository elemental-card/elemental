import getRoomStateFromRoomDoc from './getRoomStateFromRoomDoc';

export default async () => {
  const hostUids = [];

  const roomDocs = await db.collection('rooms').get();
  for (const roomDoc of roomDocs) {
    const roomState = getRoomStateFromRoomDoc(roomDoc.id, roomDoc.data());
    if (roomState.type === 'PREGAME' && roomState.players.length < 6) {
      hostUids.push(roomDoc.id);
    }
  }

  return hostUids;
};
