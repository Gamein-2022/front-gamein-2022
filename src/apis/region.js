import AxiosInstance from "./config";

export function getInitialRegion() {
  return AxiosInstance.get(`/dashboard/team/region`, {
    baseURL: "http://192.168.24.4:9090",
  });
}
