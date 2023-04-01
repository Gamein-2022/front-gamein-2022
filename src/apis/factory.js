import AxiosInstance from "./config";

export function createBuilding({ type, position = 0 }) {
  return AxiosInstance.post("/factory/building/", { type, position });
}

export function getBuildingsInfo() {
  return AxiosInstance.get("/factory/building/info");
}
