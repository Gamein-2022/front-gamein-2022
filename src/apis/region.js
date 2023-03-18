import AxiosInstance from "./config";

export function getInitialRegion() {
  return AxiosInstance.post("dashboard/auth/login/");
}
