import { atom } from "recoil";

interface FriendState {
  isShow: boolean;
  friends: {
    userId: number;
    following: {
      createdAt: string;
      email: string;
      id: number;
      nickname: string;
      profileUrl: string;
      sex: "남" | "여";
      updatedAt: string;
    };
  }[];
}

export const friendState = atom<FriendState>({
  key: "Friend",
  default: {
    isShow: false,
    friends: [],
  },
});
