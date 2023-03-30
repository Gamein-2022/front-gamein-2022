import AxiosInstance from "./config";

export function getOrdersHistory() {
  return AxiosInstance.get("/market/order/history");
}

export function cancelOrder({ id }) {
  return AxiosInstance.delete(`/market/order/${id}`);
}

export function getOrderOffers({ id }) {
  return AxiosInstance.get(`/market/offer/received/${id}`);
}

export function acceptOffer({ id, shippingMethod }) {
  return AxiosInstance.put(`/market/offer/${id}/accept`, {
    shippingMethod,
  });
}
