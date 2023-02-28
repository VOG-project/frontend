import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { sessionStorage } from "@/utils/sessionStorage";

const { persistAtom } = recoilPersist({
  key: "game",
  storage: sessionStorage,
});

export const selectedGameState = atom({
  key: "SelectedGame",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
