import { atom } from "recoil";

import {
  LEFT_TABLE_TABS,
  MIDDLE_TABLE_TABS,
  SHOP_INNER_TABS,
  RIGHT_TABLE_TABS,
  PRODUCTION_AND_ASSEMBLY_TABS,
} from "../constants/tabs";

export const rightTableTab = atom({
  key: "rightTableTab",
  default: RIGHT_TABLE_TABS.shop,
});

export const rightTableOpen = atom({
  key: "rightTableOpen",
  default: false,
});

export const shopInnerTab = atom({
  key: "shopInnerTab",
  default: SHOP_INNER_TABS.rawMaterials,
});

export const productionAndAssemblyInnerTab = atom({
  key: "productionAndAssemblyInnerTab",
  default: PRODUCTION_AND_ASSEMBLY_TABS.ground1,
});

export const middleTableTab = atom({
  key: "middleTableTab",
  default: MIDDLE_TABLE_TABS.news,
});

export const middleTableOpen = atom({
  key: "middleTableOpen",
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
