export default async (hostUid) => {
  await db.collection('rooms').doc(hostUid).delete();
};
