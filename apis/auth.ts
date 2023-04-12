import customAxios from "@/utils/customAxios";

export interface LoginRequest {
  email: string;
  password: string;
}

const naverLoginRequest = async (code: string, state: string) => {
  const res = await customAxios().post("/auth/login/naver", {
    code,
    state,
  });

  return res.data;
};

const logoutRequest = async () => {
  const res = await customAxios().delete("/auth/logout");

  return res.data;
};

export { naverLoginRequest, logoutRequest };
