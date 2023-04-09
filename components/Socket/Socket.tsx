import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import tw, { styled } from "twin.macro";
import useModal from "@/hooks/useModal";
import useChatState from "@/hooks/useChatState";
import useUserState from "@/hooks/useUserState";
import useUserProfileState from "@/hooks/useUserProfileState";
import ChatSocket from "./ChatSocket";
import DeviceSettingModal from "./DeviceSettingModal";
import { socketClient } from "@/utils/socketClient";
import { enterRoomEmit, leaveRoomEmit } from "@/utils/socketClient";
import useMediaDevice from "@/hooks/useMediaDevice";

const Socket = () => {
  const [isChatRoom, setIsChatRoom] = useState(false);
  const router = useRouter();
  const { isOpen, handleModalOpen, handleModalClose } = useModal();
  const { chat, setChat, resetChat } = useChatState();
  const { userId, user } = useUserState();
  const { handleUserProfileOpen } = useUserProfileState();
  const { peerConnectionsRef } = useMediaDevice();

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
  }, []);

  const handleUnload = (e: BeforeUnloadEvent) => {
    if (chat.roomId) {
      e.preventDefault();
      handleChatRoomLeave();
      e.returnValue = "";
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
  };

  return (
    <SocketContainer isChatRoom={isChatRoom}>
      {roomId && (
        <ChatSocket
          chat={chat}
          peerConnectionsRef={peerConnectionsRef}
          setChat={setChat}
          socketConnect={socketConnect}
          handleChatRoomLeave={handleChatRoomLeave}
          handleTitleClick={handleTitleClick}
          handleUserProfileOpen={handleUserProfileOpen}
          handleModalOpen={handleModalOpen}
        />
      )}
      <DeviceSettingModal
        peerConnectionsRef={peerConnectionsRef}
        isOpen={isOpen}
        handleClose={handleModalClose}
        handleConfirm={handleModalClose}
      />
    </SocketContainer>
  );
};

export default Socket;

const SocketContainer = styled.div<{ isChatRoom: boolean }>(
  ({ isChatRoom }) => [
    tw`fixed flex items-center justify-center bottom-0 pl-64 w-full max-w-[120rem] z-10`,
    isChatRoom && tw`translate-y-64`,
  ]
);
