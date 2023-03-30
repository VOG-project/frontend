import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { sessionStorage } from "@/utils/sessionStorage";

const { persistAtom } = recoilPersist({
  key: "FRIENDS",
  storage: sessionStorage,
});

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
  effects_UNSTABLE: [persistAtom],
});
