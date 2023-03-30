import AxiosInstance from "./config";

export function getRecievedOffers() {
  return AxiosInstance.get("/market/offer/received");
}

export function getSentOffers() {
  return AxiosInstance.get("/market/offer/sent");
}

export function cancellOffer({ offerId }) {
  return AxiosInstance.delete(`/market/offer/${offerId}/`);
}

export function declineOffer({ offerId }) {
  return AxiosInstance.put(`/market/offer/${offerId}/decline`);
}
