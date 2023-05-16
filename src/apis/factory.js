import AxiosInstance from "./config";

export function createBuilding({ type, ground }) {
  return AxiosInstance.post("/service/building/", { type, ground });
}

export function getTeamBuildings() {
  return AxiosInstance.get("/service/building");
}

export function getBuildingsInfo() {
  return AxiosInstance.get("/service/building/info");
}

export function upgradeRegion() {
  return AxiosInstance.put("/service/building/upgrade-region");
}
