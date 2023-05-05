import AxiosInstance from "./config";

export function getLogs(type) {
  return AxiosInstance.get(`/dashboard/team/logs?t=${type}`);
}

export function getLeaderboard() {
  return AxiosInstance.get("/dashboard/team/rank");
}
