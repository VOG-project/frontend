import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import tw, { styled } from "twin.macro";
import useChatState from "@/hooks/useChatState";
import useUserState from "@/hooks/useUserState";
import useUserProfileState from "@/hooks/useUserProfileState";
import ChatSocket from "./ChatSocket";
import {
  socketClient,
  enterRoomEmit,
  leaveRoomEmit,
} from "@/utils/socketClient";
import useMediaDevice from "@/hooks/useMediaDevice";

const Socket = () => {
  const [isChatRoom, setIsChatRoom] = useState(false);
  const router = useRouter();
  const { chat, setChat, resetChat } = useChatState();
  const { userId, user } = useUserState();
  const { handleUserProfileOpen } = useUserProfileState();
  const {
    peerConnectionsRef,
    localStreamRef,
    getLocalStream,
    getDevices,
    handleMicMuteClick,
    handleVolumeMuteClick,
  } = useMediaDevice();

  const roomId = chat.roomId;

  useEffect(() => {
    if (router.query.id === chat.roomId) {
      setIsChatRoom(true);
    } else {
      setIsChatRoom(false);
    }
  }, [router]);

  useEffect(() => {
    window.addEventListener("beforeunload", handleUnload);

    return () => window.removeEventListener("beforeunload", handleUnload);
  }, [chat]);

  const handleUnload = (e: BeforeUnloadEvent) => {
    if (chat.roomId) {
      e.preventDefault();
      e.returnValue = "";
      handleChatRoomLeave();
      router.replace("/chat");
    }
  };

  const handleTitleClick = () => {
    if (chat.roomId) {
      router.push(`/chat/${roomId}`);
    }
  };

  const socketConnect = () => {
    if (!userId) return;

    socketClient.connect();
    enterRoomEmit(userId, user.nickname, roomId);
  };

  const handleChatRoomLeave = () => {
    if (!userId) return;

    if (peerConnectionsRef.current) {
      Object.values(peerConnectionsRef.current).forEach((peerConnection) =>
        peerConnection.close()
      );
    }
    leaveRoomEmit(userId, roomId);
    resetChat();
    router.back();
  };

  return (
    <SocketContainer isChatRoom={isChatRoom}>
      {roomId && (
        <ChatSocket
          chat={chat}
          isChatRoom={isChatRoom}
          peerConnectionsRef={peerConnectionsRef}
          localStreamRef={localStreamRef}
          setChat={setChat}
          socketConnect={socketConnect}
          getLocalStream={getLocalStream}
          getDevices={getDevices}
          handleChatRoomLeave={handleChatRoomLeave}
          handleMicMuteClick={handleMicMuteClick}
          handleVolumeMuteClick={handleVolumeMuteClick}
          handleTitleClick={handleTitleClick}
          handleUserProfileOpen={handleUserProfileOpen}
        />
      )}
    </SocketContainer>
  );
};

export default Socket;

const SocketContainer = styled.div<{ isChatRoom: boolean }>(
  ({ isChatRoom }) => [
    tw`fixed flex items-center justify-center left-1/2 bottom-0 -translate-x-1/2 w-full pl-64 max-w-[120rem] z-10`,
    isChatRoom && tw`translate-y-16`,
  ]
);
