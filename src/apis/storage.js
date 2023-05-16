import AxiosInstance from "./config";

export function getStorageInfo() {
  return AxiosInstance.get("/service/storage");
}

export function getStorageQueue() {
  return AxiosInstance.get("/service/storage/queue");
}

export function getStorageInRoute() {
  return AxiosInstance.get("/service/storage/in-route");
}

export function collectShipping({ id }) {
  return AxiosInstance.put(`/service/storage/${id}/collect`);
}

export function removeInQueueItem({ id }) {
  return AxiosInstance.delete(`/service/storage/${id}`);
}

export function removeFromStorage({ productId, quantity }) {
  return AxiosInstance.put(`/service/storage/remove`, {
    productId,
    quantity,
  });
}

export function upgradeStorage() {
  return AxiosInstance.post("/service/storage/upgrade-storage");
}
