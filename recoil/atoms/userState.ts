import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { sessionStorage } from "@/utils/sessionStorage";

interface UserState {
  userId: number | null;
  nickname: string;
}

const { persistAtom } = recoilPersist({
  key: "User",
  storage: sessionStorage,
});

export const userState = atom<UserState>({
  key: "User",
  default: {
    userId: null,
    nickname: "",
  },
  effects_UNSTABLE: [persistAtom],
});
