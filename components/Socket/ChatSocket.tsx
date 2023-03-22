import { useEffect } from "react";
import tw from "twin.macro";
import useChatState from "@/hooks/useChatState";
import Button from "../common/Button";
import { socketClient } from "@/utils/socketClient";
import { enterRoomEmit } from "@/utils/socketClient";

const ChatSocket = () => {
  const { chat } = useChatState();
  // const constraints = {
  //   audio: true,
  // };

  useEffect(() => {
    socketClient.connect();
    enterRoomEmit(11, "test", chat.roomId);
    socketClient.on("setChat", (data) => {
      console.log(data);
    });

    socketClient.on("inputChat", (data) => {
      console.log("inputChat", data);
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
  });

  return (
    <ChatSocketContainer>
      <Button bgColor="primary" onClick={() => {}}>
        소켓
      </Button>
    </ChatSocketContainer>
  );
};

export default ChatSocket;

const ChatSocketContainer = tw.div`
  w-full h-16 bg-white/70
`;
