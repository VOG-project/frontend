import customAxios from "@/utils/customAxios";

export interface SignUpRequest {
  email: string;
  password: string;
  nickname: string;
  sex: string;
}

export interface ChangeNicknameRequest {
  userId: number;
  newNickname: string;
}

export interface ChangePasswordRequest {
  userId: number;
  currentPassword: string;
  newPassword: string;
}

export interface WithdrawalRequest {
  userId: number;
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

const changeNicknameRequest = async ({
  userId,
  newNickname,
}: ChangeNicknameRequest) => {
  const res = await customAxios().patch(`/users/${userId}/nickname`, {
    newNickname,
  });

  return res.data;
};

const changePasswordRequest = async ({
  userId,
  currentPassword,
  newPassword,
}: ChangePasswordRequest) => {
  const res = await customAxios().patch(`/users/${userId}/password`, {
    currentPassword,
    newPassword,
  });

  return res.data;
};

const withdrawalRequest = async ({ userId }: WithdrawalRequest) => {
  const res = await customAxios().delete(`/users/${userId}/withdrawal`);

  return res.data;
};

export {
  signUpRequest,
  changeNicknameRequest,
  changePasswordRequest,
  withdrawalRequest,
};
