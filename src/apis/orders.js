import AxiosInstance from "./config";

export function getOrdersHistory() {
  return AxiosInstance.get("/market/order/history");
}

export function cancelOrder(id) {
  return AxiosInstance.delete(`/market/order/${id}`);
}
