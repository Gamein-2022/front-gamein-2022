import AxiosInstance from "./config";

export function getInitialRegion() {
  return AxiosInstance.get(`/dashboard/team/region`);
}
