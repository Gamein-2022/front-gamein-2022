import AxiosInstance from "./config";

export function getRawMaterials() {
  return AxiosInstance.get("market/trade/raw-materials");
}

export function tradeWithGamein({ side, productId, quantity }) {
  return AxiosInstance.post("market/trade/trade-with-gamein", {
    side,
    productId,
    quantity,
  });
}
