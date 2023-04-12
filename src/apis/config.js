import axios from "axios";

const AxiosInstance = axios.create({
  // baseURL: "http://185.97.117.47",
  // baseURL: "http://gamein.ghanati.me",
  baseURL: "http://192.168.24.19",
  // baseURL: "https://6d24-178-236-108-56.eu.ngrok.io",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(
  async (request) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        request.headers["Authorization"] = "Bearer " + token;
      }

      return request;
    } catch (err) {
      return err;
    }
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default AxiosInstance;
