import appendAction from "./appendAction";

export default async (hostUid, guestUid, guestName) => {
  await appendAction(hostUid, {
    type: "JOIN",
    author: guestUid,
    name: guestName,
  });
};
