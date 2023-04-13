import { atom } from "recoil";

export const loadingState = atom({
  key: "IsLoading",
  default: false,
});
