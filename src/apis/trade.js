import AxiosInstance from "./config";

export function getRawMaterials() {
  return AxiosInstance.get("service/product/raw-materials");
}

export function getIntermediateMaterials() {
  return AxiosInstance.get("/service/product/intermediate-products");
}

export function getFinalProducts() {
  return AxiosInstance.get("/service/product/final-products");
}

export function buyFromGamein({ productId, quantity, shippingMethod }) {
  return AxiosInstance.post("/service/gamein/buy", {
    productId,
    quantity,
    shippingMethod,
  });
}

export function submitBuyOrder({ productId, quantity, price }) {
  return AxiosInstance.post("/service/order", {
    orderType: "BUY",
    productId,
    quantity,
    price,
  });
}

export function submitSellOrder({ productId, quantity, price }) {
  return AxiosInstance.post("/service/order", {
    orderType: "SELL",
    productId,
    quantity,
    price,
  });
}

export function getOrders() {
  return AxiosInstance.get("/service/order");
}

export function getSellOrders(productId) {
  if (productId) {
    return AxiosInstance.get(`/service/order?type=SELL&product=${productId}`);
  }
  return AxiosInstance.get("/service/order?type=SELL");
}

export function getBuyOrders(productId) {
  if (productId) {
    return AxiosInstance.get(`/service/order?type=BUY&product=${productId}`);
  }
  return AxiosInstance.get("/service/order?type=BUY");
}

export function sendOffer({ orderId, shippingMethod }) {
  return AxiosInstance.post("/service/offer", {
    orderId,
    shippingMethod,
  });
}

export function sellToGamein({ productId, quantity, price }) {
  return AxiosInstance.post("/service/gamein/sell", {
    productId,
    quantity,
    price,
  });
}
