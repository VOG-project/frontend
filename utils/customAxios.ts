import axios, { AxiosError } from "axios";
import { getAccessToken } from "./tokenManager";

const customAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
  timeout: 3000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

customAxios.interceptors.request.use(
  (req) => {
    if (getAccessToken()) {
      req.headers.Authorization = `bearer ${getAccessToken()}`;
    }
    return req;
  },
  (error) => {
    throw error;
  }
);

customAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const axiosError = error as AxiosError;
    if (axiosError.code === "ERR_NETWORK") {
      console.error("서버 에러");
      throw new Error("서버에러");
    } else {
      console.log(error);
      const status = error.response.data.statusCode;
      if (status >= 400 && status <= 404) {
        return error.response;
      }
    }
  }
);

export default customAxios;
