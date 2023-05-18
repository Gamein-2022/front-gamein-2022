import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "https://api-gamein2022.dariahamrah.ir",
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

AxiosInstance.interceptors.response.use(
  (response) => response,
  function (error) {
    const status = error.response ? error.response.status : null;
    if (status === 401 && window.location.pathname !== "/login") {
      window.location.href = "/login";
      localStorage.removeItem("token");
      return;
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
