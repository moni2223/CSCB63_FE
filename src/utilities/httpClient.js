import axios from "axios";
import store from "../actions";
import { stopLoading } from "../actions";
import { API_URL } from "../config/settings";
import { toast } from "react-toastify";

const httpClient = axios.create({ baseURL: API_URL });

httpClient.interceptors.request.use(
  async (config) => {
    config.headers = {};
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
    console.log(error, window.location);
    if ([401, 403]?.includes(error.response.status) && window.location.pathname !== "/login") {
      localStorage.clear();
      window.location.href = "/login";
    } else {
      console.log(error);
      const errorMessage = error?.response?.data?.error;
      if (errorMessage) toast.error(errorMessage);
      else toast.error(error?.message);
    }
    return Promise.reject(error);
  }
);

export default httpClient;
