import axios, { AxiosError } from "axios";
import { getAccessToken } from "./tokenManager";

const customAxios = () => {
  const accessToken = getAccessToken();

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
    timeout: 3000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    withCredentials: true,
  });

  instance.interceptors.request.use(
    (req) => {
      return req;
    },
    (error) => {
      throw error;
    }
  );

  instance.interceptors.response.use(
    (res) => {
      // console.log("axios request", res);
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
        if (status >= 400 && status <= 404) return error.response;
      }
    }
  );

  return instance;
};

export default customAxios;
