import AxiosInstance from "./config";

export function loginApi({ email, password, phone }) {
  return AxiosInstance.post("dashboard/auth/login/", {
    email,
    phone,
    password,
  });
}
