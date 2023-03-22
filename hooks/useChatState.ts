import { useRecoilState, useResetRecoilState } from "recoil";
import { chatState } from "@/recoil/atoms/chatState";

const useChatState = () => {
  const [chat, setChat] = useRecoilState(chatState);
  const resetChat = useResetRecoilState(chatState);

  return { chat, setChat, resetChat };
};

export default useChatState;
