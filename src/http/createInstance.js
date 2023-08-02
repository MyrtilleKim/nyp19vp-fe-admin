import apiClient from "./http-common.js";
import jwtDecode from "jwt-decode";
import { refeshToken } from "store/requests/auth.js";

export const createAxios = (user, dispatch) => {
  const newInstance = apiClient.create();
  newInstance.interceptors.request.use(
    async (config) => {
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < new Date().setTime() / 1000) {
        const data = await refeshToken(user, dispatch);
        config.headers["token"] = "Bearer " + data.accessToken;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  return newInstance;
};
