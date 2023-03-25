import AxiosInstance from "./config";

export function getStorageInfo() {
  return AxiosInstance.get("/factory/storage");
}
