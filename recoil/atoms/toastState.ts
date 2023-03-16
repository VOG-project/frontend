import { atom } from "recoil";

export interface ToastState {
  type: "success" | "alert" | null;
  text: string;
}

export const toastState = atom<ToastState>({
  key: "Toast",
  default: {
    type: null,
    text: "",
  },
});
