import customAxios from "@/utils/customAxios";

const signUpRequest = async (
  email: string,
  password: string,
  nickname: string,
  gender: string
) => {
  const res = await customAxios().post("/users/register", {
    email,
    password,
    nickname,
    sex: gender,
  });

  return res.data;
};

const changeNicknameRequest = async (userId: number, newNickname: string) => {
  const res = await customAxios().patch(`/users/${userId}/nickname`, {
    newNickname,
  });

  return res.data;
};

const changePasswordRequest = async (
  userId: number,
  currentPassword: string,
  newPassword: string
) => {
  const res = await customAxios().patch(`/users/${userId}/password`, {
    currentPassword,
    newPassword,
  });

  return res.data;
};

const uploadProfilePicRequest = async (userId, profilePic) => {
  const res = await customAxios().patch(`/uploads/users/${userId}`);

  return res.data;
};

const withdrawalRequest = async (userId: number, password: string) => {
  const res = await customAxios().delete(`/users/${userId}/withdrawal`, {
    data: {
      password,
    },
  });
  console.log(res);

  return res.data;
};

export {
  signUpRequest,
  changeNicknameRequest,
  changePasswordRequest,
  withdrawalRequest,
};
