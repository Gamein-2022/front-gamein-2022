import AxiosInstance from "./config";

export function getRawMaterials() {
  return AxiosInstance.get("market/product/raw-materials");
}

export function getIntermediateMaterials() {
  return AxiosInstance.get("/market/product/intermediate-products");
}

export function buyFromGamein({ productId, quantity, shippingMethod }) {
  return AxiosInstance.post("/market/gamein/buy", {
    productId,
    quantity,
    shippingMethod,
  });
}

export function submitBuyOrder({ productId, quantity, price }) {
  return AxiosInstance.post("/market/order", {
    orderType: "BUY",
    productId,
    quantity,
    price,
  });
}

export function submitSellOrder({ productId, quantity, price }) {
  return AxiosInstance.post("/market/order", {
    orderType: "SELL",
    productId,
    quantity,
    price,
  });
}

export function getOrders() {
  return AxiosInstance.get("/market/order");
}

export function sendOffer({ orderId, shippingMethod }) {
  return AxiosInstance.post("/market/offer", {
    orderId,
    shippingMethod,
  });
}
