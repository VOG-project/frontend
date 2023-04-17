import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { localStorage } from "@/utils/localStorage";
import { FriendState } from "@/types/friend";

const { persistAtom } = recoilPersist({
  key: "FRIENDS",
  storage: localStorage,
});

export const friendState = atom<FriendState>({
  key: "Friend",
  default: {
    isShow: false,
    friends: [],
  },
  effects_UNSTABLE: [persistAtom],
});
