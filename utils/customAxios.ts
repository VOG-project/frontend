import axios from "axios";

const customAxios = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ENDPOINT,
    timeout: 3000,
    headers: { "Content-Type": "application/json" },
  });

  instance.interceptors.request.use(
    (request) => {
      return request;
    },
    (error) => {
      throw error;
    }
  );

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      throw error;
    }
  );

  return instance;
};

export default customAxios;
