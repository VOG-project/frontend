import { atom } from "recoil";

export interface ToastState {
  key: string;
  type: "success" | "alert" | null;
  text: string;
}

export const toastState = atom<ToastState[]>({
  key: "Toast",
  default: [{ key: "", type: null, text: "" }],
});
