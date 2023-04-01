import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import ChatSocket from "./ChatSocket";
import useChatState from "@/hooks/useChatState";
import useUserState from "@/hooks/useUserState";
import { socketClient } from "@/utils/socketClient";
import { enterRoomEmit, leaveRoomEmit } from "@/utils/socketClient";

const Socket = () => {
  const [isChatRoom, setChatRoom] = useState(false);
  const router = useRouter();
  const {
    chat: { roomId },
    setChat,
    resetChat,
  } = useChatState();
  const { userId, user } = useUserState();

  useEffect(() => {
    if (router.asPath.split("/").includes("chat") && router.query.id) {
      setChatRoom(true);
    } else setChatRoom(false);
  }, [router]);

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
    <SocketContainer>
      {roomId && (
        <ChatSocket
          isChatRoom={isChatRoom}
          roomId={roomId}
          setChat={setChat}
          socketConnect={socketConnect}
          handleChatRoomLeave={handleChatRoomLeave}
        />
      )}
    </SocketContainer>
  );
};

export default Socket;

const SocketContainer = tw.div`
  fixed flex items-center justify-center left-1/2 bottom-0 -translate-x-1/2 pl-64 w-full max-w-[120rem] z-[100]
`;
