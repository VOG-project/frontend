import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "game",
  storage: sessionStorage,
});

export const selectedGameState = atom({
  key: "SelectedGame",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
