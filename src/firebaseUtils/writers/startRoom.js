import appendAction from "./appendAction";

const U32_MAX = 2 ** 32 - 1;

export default async hostUid => {
  await appendAction(hostUid, {
    type: "HOST_START",
    author: hostUid,
    prngState: [
      ~~(Math.random() * U32_MAX),
      ~~(Math.random() * U32_MAX),
      ~~(Math.random() * U32_MAX),
      ~~(Math.random() * U32_MAX),
    ],
  });
};
