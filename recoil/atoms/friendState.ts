import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { sessionStorage } from "@/utils/sessionStorage";
import { FriendState } from "@/types/friend";

const { persistAtom } = recoilPersist({
  key: "FRIENDS",
  storage: sessionStorage,
});

export const friendState = atom<FriendState>({
  key: "Friend",
  default: {
    isShow: false,
    friends: [],
  },
  effects_UNSTABLE: [persistAtom],
});
