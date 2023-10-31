import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { getStorageJwtToken, removeStorageJwtToken } from "src/helpers/storage";

export class HttpClient {
  axiosInstance: AxiosInstance;

  constructor() {
    const tokenAccess = getStorageJwtToken();
    
    let configs: AxiosRequestConfig = {
      baseURL: process.env.REACT_APP_API_ENDPOINT,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${tokenAccess}`,
      },
      // timeout: 5000,
      transformRequest: [
        (data, headers) => {
          if (data instanceof FormData) {
            if (headers) {
              delete headers["Content-Type"];
            }
            return data;
          }
          return JSON.stringify(data);
        },
      ],
    };

    this.axiosInstance = axios.create(configs);

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (
          error?.response?.status === 401 ||
          error?.response?.data?.validator_errors === "Unauthorized"
        ) {
          removeStorageJwtToken();
          return window.location.reload();
        }
        return Promise.reject(error);
      }
    );
  }
}
