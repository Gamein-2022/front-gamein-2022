import AxiosInstance from "./config";

export function getStorageInfo() {
  return AxiosInstance.get("/factory/storage");
}

export function getStorageQueue() {
  return AxiosInstance.get("/factory/storage/queue");
}

export function getStorageInRoute() {
  return AxiosInstance.get("/factory/storage/in-route");
}

export function collectShipping({ id }) {
  return AxiosInstance.put(`/factory/storage/${id}/collect`);
}

export function removeInQueueItem({ id }) {
  return AxiosInstance.delete(`/factory/storage/${id}`);
}

export function removeFromStorage({ productId, quantity }) {
  return AxiosInstance.put(`/factory/storage/remove`, {
    productId,
    quantity,
  });
}

export function upgradeStorage() {
  return AxiosInstance.post("/factory/storage/update-storage");
}
