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
  fixed pl-64 bottom-0 w-full z-[100]
`;
