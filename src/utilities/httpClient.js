import axios from "axios";
import store from "../actions";
import { stopLoading } from "../actions";
import { API_URL } from "../config/settings";
import { toast } from "react-toastify";

const httpClient = axios.create({ baseURL: API_URL });

httpClient.interceptors.request.use(
  async (config) => {
    const tokenStorage = localStorage.getItem("fantasticoToken") ?? "";
    config.headers = {
      ...(tokenStorage && { Authorization: `Bearer ${tokenStorage}` }),
      "X-Platform": "web",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

httpClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    store.dispatch(stopLoading());
    console.log(error);
    if ([401, 403]?.includes(error.response.status)) {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      const errorMessage = error?.response?.data?.message;
      if (errorMessage) toast.error(errorMessage);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
