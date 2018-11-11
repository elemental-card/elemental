import appendAction from "./appendAction";

export default async (hostUid, authorUid) => {
  await appendAction(hostUid, {
    type: "LEAVE",
    author: authorUid,
  });
};
