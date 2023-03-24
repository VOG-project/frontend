import { atom } from "recoil";

interface UserState {
  userId: number | null;
  nickname: string;
}

export const userState = atom<UserState>({
  key: "User",
  default: {
    userId: null,
    nickname: "",
  },
});
