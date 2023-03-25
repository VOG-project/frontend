import { atom } from "recoil";
import { ChatState } from "@/types/chat";

export const chatState = atom<ChatState>({
  key: "Chat",
  default: {
    chatParticipant: [],
    messages: [],
    title: "",
    roomId: "",
  },
});
