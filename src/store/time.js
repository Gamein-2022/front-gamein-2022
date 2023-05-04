import { atom } from "recoil";

export const yearState = atom({
  key: "yearState",
  default: 0,
});

export const monthState = atom({
  key: "monthState",
  default: 0,
});

export const dayState = atom({
  key: "dayState",
  default: 0,
});


export const isGamePausedState = atom({
  key: "isGamePausedState",
  default: false,
});
