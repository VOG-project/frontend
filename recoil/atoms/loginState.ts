import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { sessionStorage } from "@/utils/sessionStorage";

const { persistAtom } = recoilPersist({
  key: "Login",
  storage: sessionStorage,
});

export const loginState = atom({
  key: "isLogin",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
