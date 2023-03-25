import { useEffect } from "react";
import tw, { styled } from "twin.macro";
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
  // const constraints = {
  //   audio: true,
  // };

  useEffect(() => {
    socketConnect();

    socketClient.on("setChat", (data) => {
      const { roomId, chatParticipant, title } = data;
      setChat((prev) => {
        return { ...prev, roomId, chatParticipant, title };
      });
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

    // const peerConnection = new RTCPeerConnection();
    // peerConnection.createOffer().then((v) => console.log(v));
    // navigator.mediaDevices
    //   .getUserMedia(constraints)
    //   .then((stream) => console.log(stream))
    //   .catch((error) => console.error("에러가 발생했습니다.", error));

    return () => {
      socketClient.removeAllListeners();
    };
  }, []);

  return (
    <ChatSocketContainer isChatRoom={isChatRoom}>
      <Button width={6} bgColor="secondary" onClick={handleChatRoomLeave}>
        <LeaveChatButtonIcon>{getIcons("exit", 24)}나가기</LeaveChatButtonIcon>
      </Button>
    </ChatSocketContainer>
  );
};

export default ChatSocket;

const ChatSocketContainer = styled.div<{ isChatRoom: boolean }>(
  ({ isChatRoom }) => [
    tw`block w-full h-16 bg-black/80`,
    isChatRoom && tw`hidden`,
  ]
);

const LeaveChatButtonIcon = tw.div`
  flex justify-center
`;
