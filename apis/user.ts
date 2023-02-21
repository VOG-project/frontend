import customAxios from "@/utils/customAxios";

const signUpRequest = async ({
  email,
  password,
  nickname,
  sex,
}: {
  email: string;
  password: string;
  nickname: string;
  sex: string;
}) => {
  const res = await customAxios().post("/users/register", {
    email,
    password,
    nickname,
    sex,
  });
  return res;
};

export { signUpRequest };
