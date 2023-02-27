import customAxios from "@/utils/customAxios";

export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  sex: string;
}

const signUpRequest = async ({
  email,
  password,
  nickname,
  sex,
}: SignUpRequest) => {
  const res = await customAxios().post("/users/register", {
    email,
    password,
    nickname,
    sex,
  });
  return res.data;
};

export { signUpRequest };
