import AxiosInstance from "./config";

export function getResearches() {
  return AxiosInstance.get("/factory/research");
}

export function getSubjectInfo(name) {
  return AxiosInstance.get(`/factory/research/subjects/${name}`);
}

export function startResearch(name) {
  return AxiosInstance.post(`/factory/research`, { name });
}

export function putOffResearch(name) {
  return AxiosInstance.delete(`/factory/research/subjects/${name}`);
}
