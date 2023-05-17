import AxiosInstance from "./config";

export const forgetPassword = ({ phone }) => {
  return AxiosInstance.post("/dashboard/auth/forget-password/", {
    phone,
  });
};

export const resetPassword = ({ code, password }) => {
  return AxiosInstance.post("/dashboard/auth/reset-password/", {
    code,
    password,
  });
};
