import AxiosInstance from "./config";

export function getLines() {
  return AxiosInstance.get("/service/line");
}

// export function getProductRequirements({ productId }) {
//   return AxiosInstance.post("/service/storage/req/", {
//     productId,
//   });
// }

export function getLineAvailableProducts({ id }) {
  return AxiosInstance.get(`/service/line/${id}/available`);
}

export function getLineGroups({ t }) {
  return AxiosInstance.get(`/service/line/groups?t=${t}`);
}

export function initLine({ lineId, group }) {
  return AxiosInstance.post("/service/line/init/", {
    lineId,
    group,
  });
}

export function getSetupLineInfo({ lineId }) {
  return AxiosInstance.get(`/service/line/req?id=${lineId}&c=10`);
}

export function startLine({ lineId, count, productId }) {
  return AxiosInstance.post("/service/line/start", {
    lineId,
    count,
    productId,
  });
}

export function collectLine({ lineId }) {
  return AxiosInstance.get(`/service/line/collect?id=${lineId}`);
}

export function cancelLine({ lineId }) {
  return AxiosInstance.delete(`/service/line/${lineId}`);
}

export function getGroundInfo(ground) {
  return AxiosInstance.get(`/service/building/${ground}`);
}

export function deleteBuilding(ground) {
  return AxiosInstance.delete(`/service/building/${ground}`);
}

export function upgradeBuilding(buildingId) {
  return AxiosInstance.put(`/service/building/${buildingId}`);
}
