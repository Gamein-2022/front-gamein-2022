import AxiosInstance from "./config";

export function getRecievedOffers() {
  return AxiosInstance.get("/service/offer/received");
}

export function getSentOffers() {
  return AxiosInstance.get("/service/offer/sent");
}

export function cancellOffer({ offerId }) {
  return AxiosInstance.delete(`/service/offer/${offerId}/`);
}

export function declineOffer({ offerId }) {
  return AxiosInstance.put(`/service/offer/${offerId}/decline`);
}

export function archiveOffer({ id }) {
  return AxiosInstance.put(`/service/offer/${id}/archive`);
}
