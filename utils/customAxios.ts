import axios from "axios";

const customAxios = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
    timeout: 3000,
    headers: { "Content-Type": "application/json" },
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
      return res;
    },
    (error) => {
      const status = error.response.data.statusCode;
      if (status === 401) return error.response;
    }
  );

  return instance;
};

export default customAxios;
