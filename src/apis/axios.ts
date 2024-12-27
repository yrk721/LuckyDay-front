import axios, { AxiosInstance, AxiosResponse } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (accessToken) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data?.code === "1004") {
      window.dispatchEvent(new CustomEvent("ACCESS_DENIED"));
      return Promise.reject();
    }
    if (response.data?.code === "1001") {
      window.dispatchEvent(new CustomEvent("TOKEN_EXPIRED"));
      return Promise.reject();
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 403) {
      window.dispatchEvent(new CustomEvent("ACCESS_DENIED"));
    }
    if (error.response?.status === 401) {
      window.dispatchEvent(new CustomEvent("TOKEN_EXPIRED"));
    }
    return Promise.reject(error);
  }
);

export const ax = instance;
