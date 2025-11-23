import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = "https://verified-medical-aid.onrender.com/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});


api.interceptors.request.use((config) => {
  const token = Cookies.get("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers["Authorization"] = "Bearer " + token;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          `${API_BASE_URL}/users/refresh`,
          {},
          { withCredentials: true }
        );

        const newAccess = data?.access_token;
        Cookies.set("access_token", newAccess);

        processQueue(null, newAccess);
        isRefreshing = false;

        originalRequest.headers["Authorization"] = `Bearer ${newAccess}`;
        return api(originalRequest);
      } catch (error) {
        processQueue(error, null);
        isRefreshing = false;

        localStorage.clear();
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(err);
  }
);

export default api;
