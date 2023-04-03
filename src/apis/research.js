import AxiosInstance from "./config";

export function getResearches() {
  return AxiosInstance.get("/factory/research");
}
