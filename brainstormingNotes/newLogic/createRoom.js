export default async (hostUid, hostName) => {
  const doc = db.collection('rooms').doc(hostUid);
  try {
    await doc.set({
      hostName,
      actions: [],
    });
  } catch (unused) {
    await doc.delete();
    await doc.set({
      hostName,
      actions: [],
    });
  }
};
