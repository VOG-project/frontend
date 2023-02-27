import customAxios from "@/utils/customAxios";

export interface LoginRequest {
  email: string;
  password: string;
}

const loginRequest = async ({ email, password }: LoginRequest) => {
  const res = await customAxios().post("/auth/login", {
    email,
    password,
  });

  return res.data;
};

const logoutRequest = async () => {
  const res = await customAxios().delete("/auth/logout");

  return res.data;
};

export { loginRequest, logoutRequest };
