import AxiosInstance from "./config";

export function getTime() {
  return AxiosInstance.get("/dashboard/auth/time");
}
