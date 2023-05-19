import AxiosInstance from "./config";

export function getLogs(type) {
  if (type) { 
    return AxiosInstance.get(`/dashboard/team/logs?t=${type}`);
  }
  return  AxiosInstance.get("/dashboard/team/logs");
}

export function getLeaderboard() {
  return AxiosInstance.get("/dashboard/team/rank");
}
