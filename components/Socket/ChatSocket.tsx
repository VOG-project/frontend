import { useEffect, useRef } from "react";
import tw, { styled } from "twin.macro";
import useWebRTC from "@/hooks/useWebRTC";
import Button from "../common/Button";
import { socketClient } from "@/utils/socketClient";
import { getIcons } from "../icons";
import { ChatSocketProps } from "@/types/chat";

const ChatSocket = ({
  isChatRoom,
  setChat,
  socketConnect,
  handleChatRoomLeave,
}: ChatSocketProps) => {
  const peerStreamRef = useRef<HTMLAudioElement>(null);
  const {
    createPeerConnection,
    sendOffer,
    getOffer,
    getAnswer,
    getIceCandidate,
  } = useWebRTC();

  useEffect(() => {
    socketConnect();

    socketClient.on("setChat", async (data) => {
      const { roomId, chatParticipant, title } = data;
      setChat((prev) => {
        return { ...prev, roomId, chatParticipant, title };
      });
    });

    socketClient.on("welcome", async (socketId) => {
      createPeerConnection(socketId);
      sendOffer(socketId);
    });

    socketClient.on("inputChat", (data) => {
      setChat((prev) => {
        return {
          ...prev,
          messages: [...prev.messages, { ...data, isSender: false }],
        };
      });
    });

    socketClient.on("leaveChat", (data) => {
      const { exit } = data;
      if (exit) {
        console.log(data);
      }
    });

    socketClient.on("leaveUser", (data) => {
      console.log(data);
    });

    socketClient.on("offer", async (data) => {
      const { socketId, offer } = data;
      // console.log("recieve offer", data);
      getOffer(socketId, offer);
    });

    socketClient.on("answer", (data) => {
      const { socketId, answer } = data;
      // console.log("recieve answer", data);
      getAnswer(socketId, answer);
    });

    socketClient.on("iceCandidate", (data) => {
      const { socketId, iceCandidate } = data;
      getIceCandidate(socketId, iceCandidate);
    });

    return () => {
      socketClient.removeAllListeners();
    };
  }, []);

  return (
    <ChatSocketContainer isChatRoom={isChatRoom}>
      <Button width={6} bgColor="secondary" onClick={handleChatRoomLeave}>
        <LeaveChatButtonIcon>{getIcons("exit", 24)}나가기</LeaveChatButtonIcon>
        <audio ref={peerStreamRef} autoPlay></audio>
      </Button>
    </ChatSocketContainer>
  );
};

export default ChatSocket;

const ChatSocketContainer = styled.div<{ isChatRoom: boolean }>(
  ({ isChatRoom }) => [
    tw`block w-full h-16 bg-black/80`,
    isChatRoom && tw`invisible`,
  ]
);

const LeaveChatButtonIcon = tw.div`
  flex justify-center
`;
