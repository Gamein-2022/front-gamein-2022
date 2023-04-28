import AxiosInstance from "./config";

export function getProductionAssemblyLogs() {
  return AxiosInstance.get("/dashboard/team/logs");
}

export function getBuySellLogs() {
  return AxiosInstance.get("/market/order/logs");
}

export function getLeaderboard() {
  return AxiosInstance.get("/dashboard/team/rank");
}
