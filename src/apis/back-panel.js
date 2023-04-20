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
