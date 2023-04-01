import { atom } from "recoil";
import { ChatState } from "@/types/chat";
import { recoilPersist } from "recoil-persist";
import { sessionStorage } from "@/utils/sessionStorage";

const { persistAtom } = recoilPersist({
  key: "CHAT",
  storage: sessionStorage,
});

export const chatState = atom<ChatState>({
  key: "Chat",
  default: {
    chatParticipant: [],
    messages: [],
    title: "",
    roomId: "",
  },
  effects_UNSTABLE: [persistAtom],
});
