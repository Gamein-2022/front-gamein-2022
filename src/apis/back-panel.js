import AxiosInstance from "./config";

export function sendNotification({ message, type }) {
  return AxiosInstance.post("/websocket/api/notify/", {
    message,
    type,
  });
}

export function getAdminInfo() {
  return AxiosInstance.get("/dashboard/panel");
}

export function increaseUsersMoney({ value }) {
  return AxiosInstance.post("/dashboard/panel/balance", {
    addBalance: value,
  });
}

export function startOverGame() {
  return AxiosInstance.post("/dashboard/panel/start-over");
}

export function pauseGame() {
  return AxiosInstance.post("/dashboard/panel/pause");
}

export function resumeGame() {
  return AxiosInstance.post("/dashboard/panel/resume");
}

export function getBackPanelLeaderBoard() {
  return AxiosInstance.get("/dashboard/panel/top-100");
}

export function registerNewUser({ phone, email, password }) {
  return AxiosInstance.post("/dashboard/auth/register", {
    phone,
    email,
    password,
  });
}

export function addTeam({ username, password, teamName }) {
  return AxiosInstance.post("/dashboard/panel/add-team", {
    username,
    password,
    teamName,
  });
}
