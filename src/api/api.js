import axios from "axios";

export const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL,
  withCredentials: true,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // config.headers["Content-Type"] = "application/json";
    config.headers["accept"] = "application/json";

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
