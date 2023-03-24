import { useRecoilValue } from "recoil";
import tw from "twin.macro";
import ChatSocket from "./ChatSocket";
import { chatState } from "@/recoil/atoms/chatState";

const Socket = () => {
  const chat = useRecoilValue(chatState);
  return <SocketContainer>{chat.roomId && <ChatSocket />}</SocketContainer>;
};

export default Socket;

const SocketContainer = tw.div`
  fixed flex items-center justify-center left-1/2 bottom-0 -translate-x-1/2 pl-64 w-full max-w-[120rem] z-[100]
`;
