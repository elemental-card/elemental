import appendAction from "./appendAction";

export default async (hostUid, authorUid, bid) => {
  await appendAction(hostUid, {
    type: "CHOOSE_BID",
    author: authorUid,
    bid,
  });
};
