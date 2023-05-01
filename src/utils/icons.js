import {
  FINAL_MATERIALS,
  INTERMEDIATE_MATERIALS_LEVEL_ONE,
  INTERMEDIATE_MATERIALS_LEVEL_TWO,
  RAW_MATERIALS,
} from "../constants/materials";

export function getProductIcon(name) {
  return (
    RAW_MATERIALS[name]?.icon ||
    INTERMEDIATE_MATERIALS_LEVEL_ONE[name]?.icon ||
    INTERMEDIATE_MATERIALS_LEVEL_TWO[name]?.icon ||
    FINAL_MATERIALS[name]?.icon
  );
}
