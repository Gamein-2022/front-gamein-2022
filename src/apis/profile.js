import AxiosInstance from "./config";

export function getInfo() {
  return AxiosInstance.get("/dashboard/auth/info");
}
