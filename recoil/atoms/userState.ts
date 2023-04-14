import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { localStorage } from "@/utils/localStorage";

export interface UserState {
  oauthId: string;
  provider: string;
  id: number | null;
  nickname: string;
  profileUrl: string;
  sex: string;
}

const { persistAtom } = recoilPersist({
  key: "User",
  storage: localStorage,
});

export const userState = atom<UserState>({
  key: "User",
  default: {
    oauthId: "",
    provider: "",
    id: null,
    nickname: "",
    profileUrl: "/image/blank_profile.png",
    sex: "",
  },
  effects_UNSTABLE: [persistAtom],
});
