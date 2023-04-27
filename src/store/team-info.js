import { atom } from "recoil";

export const balanceState = atom({
  key: "balanceState",
  default: 0,
});

export const infoState = atom({
  key: "infoState",
  default: {},
});
