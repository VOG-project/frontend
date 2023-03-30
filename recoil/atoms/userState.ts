import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { sessionStorage } from "@/utils/sessionStorage";

export interface UserState {
  id: number | null;
  nickname: string;
  email: string;
  profileUrl: string;
  sex: string;
}

const { persistAtom } = recoilPersist({
  key: "User",
  storage: sessionStorage,
});

export const userState = atom<UserState>({
  key: "User",
  default: {
    id: null,
    nickname: "",
    email: "",
    profileUrl: "",
    sex: "",
  },
  effects_UNSTABLE: [persistAtom],
});
