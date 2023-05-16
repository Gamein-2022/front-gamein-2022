import AxiosInstance from "./config";

export function getResearches() {
  return AxiosInstance.get("/service/research");
}

export function getSubjectInfo(name) {
  return AxiosInstance.get(`/service/research/subjects/${name}`);
}

export function startResearch(name) {
  return AxiosInstance.post(`/service/research`, { name });
}

export function putOffResearch(name) {
  return AxiosInstance.delete(`/service/research/subjects/${name}`);
}
