import AxiosInstance from "./config";

export function getLines() {
  return AxiosInstance.get("/factory/line");
}

// export function getProductRequirements({ productId }) {
//   return AxiosInstance.post("/factory/storage/req/", {
//     productId,
//   });
// }

export function getLineAvailableProducts({ id }) {
  return AxiosInstance.get(`/factory/line/${id}/available`);
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

export function startLine({ lineId, count, productId }) {
  return AxiosInstance.post("/factory/line/start", {
    lineId,
    count,
    productId,
  });
}

export function collectLine({ lineId }) {
  return AxiosInstance.get(`/factory/line/collect?id=${lineId}`);
}
