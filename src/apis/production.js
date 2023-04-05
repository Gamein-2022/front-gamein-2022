import AxiosInstance from "./config";

export function getLines() {
  return AxiosInstance.get("/factory/line");
}

// export function getProductRequirements({ productId }) {
//   return AxiosInstance.post("/factory/storage/req/", {
//     productId,
//   });
// }

export function getAvailableProducts() {
  return AxiosInstance.get("/factory/research/available");
}

export function getLineGroups({ t }) {
  return AxiosInstance.get(`/factory/line/groups?t=${t}`);
}

export function initLine({ lineId, group }) {
  return AxiosInstance.post("/factory/line/init/", {
    lineId,
    group,
  });
}

export function getSetupLineInfo({ lineId }) {
  return AxiosInstance.get(`/factory/line/req?id=${lineId}&c=10`);
}

export function startLine({ lineId, count }) {
  return AxiosInstance.post("/factory/line/start", {
    lineId,
    count,
  });
}

export function collectLine({ lineId }) {
  return AxiosInstance.get(`/factory/line/collect?id=${lineId}`);
}
