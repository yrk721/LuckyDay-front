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
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (
      error.response?.status === 401 ||
      error.response?.data?.code === "1001"
    ) {
      const event = new CustomEvent("TOKEN_EXPIRED");
      window.dispatchEvent(event);
    }

    if (
      error.response?.status === 403 ||
      error.response?.data?.code === "1004"
    ) {
      const event = new CustomEvent("ACCESS_DENIED");
      window.dispatchEvent(event);
    }

    return Promise.reject(error);
  }
);

export const ax = instance;
