import customAxios from "@/utils/customAxios";

const loginRequest = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const res = await customAxios().post("/auth/login", {
    email,
    password,
  });

  return res;
};

const logoutRequest = async () => {
  const res = await customAxios().delete("/auth/logout");

  return res;
};

export { loginRequest, logoutRequest };
