import AxiosInstance from "./config";

export function getProductRequirements({ productId }) {
  return AxiosInstance.post("/factory/storage/req/", {
    productId,
  });
}
