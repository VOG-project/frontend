import customAxios from "@/utils/customAxios";

const signUpRequest = async (
  password: string,
  nickname: string,
  gender: string
) => {
  const res = await customAxios().post("/users/register", {
    password,
    nickname,
    sex: gender,
  });

  return res.data;
};

const getUserInfoRequest = async (userId: number) => {
  const res = await customAxios().get(`/users/${userId}`);

  return res.data;
};

const uploadProfilePicRequest = async (userId: number, profilePic: File) => {
  const formData = new FormData();
  formData.append("image", profilePic, profilePic.name);
  const res = await customAxios().patch(`/uploads/users/${userId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
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

const withdrawalRequest = async (userId: number, password: string) => {
  const res = await customAxios().delete(`/users/${userId}/withdrawal`, {
    data: {
      password,
    },
  });

  return res.data;
};

export {
  signUpRequest,
  getUserInfoRequest,
  uploadProfilePicRequest,
  changeNicknameRequest,
  changePasswordRequest,
  withdrawalRequest,
};
