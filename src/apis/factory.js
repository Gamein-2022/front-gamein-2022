import AxiosInstance from "./config";

export function createBuilding({ type, ground }) {
  return AxiosInstance.post("/factory/building/", { type, ground });
}

export function getTeamBuildings() {
  return AxiosInstance.get("/factory/building");
}

export function getBuildingsInfo() {
  return AxiosInstance.get("/factory/building/info");
}

export function upgradeRegion() {
  return AxiosInstance.put("/factory/building/upgrade-region");
}
