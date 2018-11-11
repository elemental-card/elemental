import appendAction from "./appendAction";

export default async (hostUid, authorUid, element) => {
  await appendAction(hostUid, {
    type: "CHOOSE_TRUMP_ELEMENT",
    author: authorUid,
    element,
  });
};
