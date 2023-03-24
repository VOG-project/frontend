import { atom } from "recoil";

export const chatState = atom({
  key: "Chat",
  default: {
    members: null,
    messages: "",
    roomId: "",
  },
});
