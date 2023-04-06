import { atom } from "recoil";

import {
  LEFT_TABLE_TABS,
  MIDDLE_TABLE_TABS,
  RIGHT_TABLE_TABS,
} from "../constants/tabs";

export const rightTableTab = atom({
  key: "rightTableTab",
  default: RIGHT_TABLE_TABS.trade,
});

export const rightTableOpen = atom({
  key: "rightTableOpen",
  default: false,
});

export const leftTableTab = atom({
  key: "leftTableTab",
  default: LEFT_TABLE_TABS.productionAndAssembly,
});

export const leftTableOpen = atom({
  key: "leftTableOpen",
  default: false,
});
