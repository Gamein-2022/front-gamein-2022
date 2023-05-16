import AxiosInstance from "./config";

export function getOrdersHistory() {
  return AxiosInstance.get("/service/order/history");
}

export function cancelOrder({ id }) {
  return AxiosInstance.delete(`/service/order/${id}`);
}

export function getOrderOffers({ id }) {
  return AxiosInstance.get(`/service/offer/received/${id}`);
}

export function acceptOffer({ id, shippingMethod }) {
  return AxiosInstance.put(`/service/offer/${id}/accept`, {
    shippingMethod,
  });
}

export function archiveOrder({ id }) {
  return AxiosInstance.put(`/service/order/${id}/archive`);
}

export function archiveFinalOrder({ id }) {
  return AxiosInstance.put(`/service/gamein/${id}/archive`);
}

export function cancelFinalOrder({ id }) {
  return AxiosInstance.delete(`/service/gamein/${id}`);
}

export function getOrderShippingInfo({ id }) {
  return AxiosInstance.get(`/service/order/${id}/shipping-info`);
}

export function getFinalNextTime() {
  return AxiosInstance.get(`/service/gamein/next-time`);
}
