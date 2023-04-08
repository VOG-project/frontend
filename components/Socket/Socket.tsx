import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import tw, { styled } from "twin.macro";
import ChatSocket from "./ChatSocket";
import useChatState from "@/hooks/useChatState";
import useUserState from "@/hooks/useUserState";
import { socketClient } from "@/utils/socketClient";
import { enterRoomEmit, leaveRoomEmit } from "@/utils/socketClient";

const Socket = () => {
  const [isChatRoom, setIsChatRoom] = useState(false);
  const router = useRouter();
  const { chat, setChat, resetChat } = useChatState();
  const { userId, user } = useUserState();
  const roomId = chat.roomId;

  useEffect(() => {
    if (router.query.id === chat.roomId) {
      console.log("true");
      setIsChatRoom(true);
    } else {
      console.log("false");
      setIsChatRoom(false);
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);

    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const handleUnload = (e: BeforeUnloadEvent) => {
    if (chat.roomId) {
      e.preventDefault();
      handleChatRoomLeave();
      e.returnValue = "";
    }
  };

  const socketConnect = () => {
    if (!userId) return;

    socketClient.connect();
    enterRoomEmit(userId, user.nickname, roomId);
  };

  const handleChatRoomLeave = () => {
    if (!userId) return;

    leaveRoomEmit(userId, roomId);
    resetChat();
  };

  return (
    <SocketContainer isChatRoom={isChatRoom}>
      {roomId && (
        <ChatSocket
          chat={chat}
          setChat={setChat}
          socketConnect={socketConnect}
          handleChatRoomLeave={handleChatRoomLeave}
        />
      )}
    </SocketContainer>
  );
};

export default Socket;

const SocketContainer = styled.div<{ isChatRoom: boolean }>(
  ({ isChatRoom }) => [
    tw`fixed flex items-center justify-center left-1/2 bottom-0 -translate-x-1/2 pl-64 w-full max-w-[120rem] z-[100]`,
    isChatRoom && tw`translate-y-64`,
  ]
);
