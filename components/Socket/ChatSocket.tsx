import { useEffect, useState, useRef } from "react";
import tw, { styled } from "twin.macro";
// import useWebRTC from "@/hooks/useWebRTC";
import Button from "../common/Button";
import Audio from "../common/Audio/Audio";
import { socketClient } from "@/utils/socketClient";
import { getIcons } from "../icons";
import { ChatSocketProps } from "@/types/chat";
import { ChatState } from "@/types/chat";

const CONSTRAINTS = {
  audio: true,
};

const ChatSocket = ({
  isChatRoom,
  chat,
  setChat,
  socketConnect,
  handleChatRoomLeave,
}: ChatSocketProps) => {
  // const {
  //   createPeerConnection,
  //   sendOffer,
  //   getOffer,
  //   getAnswer,
  //   getIceCandidate,
  // } = useWebRTC();
  const [socketIds, setSocketIds] = useState<string[]>([]);
  const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});

  const handleTrack = (e: RTCTrackEvent, socketId: string) => {
    setChat((prev) => {
      return {
        ...prev,
        streams: { ...prev.streams, [socketId]: e.streams[0] },
      };
    });
  };

  const createPeerConnection = async (socketId: string) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
          ],
        },
      ],
    });
    const myStream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
    myStream
      .getTracks()
      .forEach((track) => peerConnection.addTrack(track, myStream));

    peerConnection.onicecandidate = (e) => {
      if (e.candidate) {
        socketClient.emit("iceCandidate", {
          targetId: socketId,
          iceCandidate: e.candidate,
        });
      }
    };

    peerConnection.ontrack = (e) => {
      handleTrack(e, socketId);
    };
    peerConnectionsRef.current[socketId] = peerConnection;

    return peerConnection;
  };

  useEffect(() => {
    socketConnect();

    socketClient.on("setChat", async (data: ChatState) => {
      const { roomId, chatParticipant, title } = data;
      const socketIds = chatParticipant.reduce(
        (acc: string[], cur) => [...acc, cur.socketId],
        []
      );
      setSocketIds(socketIds);
      setChat((prev) => {
        return { ...prev, roomId, chatParticipant, title };
      });
    });

    socketClient.on("welcome", async (socketId) => {
      // await createPeerConnection(socketId);
      // await sendOffer(socketId);
      const peerConnection = await createPeerConnection(socketId);
      console.log(peerConnection);
      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
      });
      await peerConnection.setLocalDescription(offer);
      socketClient.emit("offer", { targetId: socketId, offer });
      console.log("sent offer");
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
      // await createPeerConnection(socketId);
      // await getOffer(socketId, offer);

      const peerConnection = await createPeerConnection(socketId);
      console.log("received offer");

      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer({
        offerToReceiveAudio: true,
      });
      await peerConnection.setLocalDescription(answer);
      socketClient.emit("answer", { targetId: socketId, answer });
      console.log("sent answer");
    });

    socketClient.on("answer", async (data) => {
      const { socketId, answer } = data;
      // await getAnswer(socketId, answer);
      const peerConnection = peerConnectionsRef.current[socketId];
      await peerConnection.setRemoteDescription(answer);
      console.log("received answer");
    });

    socketClient.on("iceCandidate", async (data) => {
      const { socketId, iceCandidate } = data;
      // await getIceCandidate(socketId, iceCandidate);
      const peerConnection = peerConnectionsRef.current[socketId];
      if (peerConnection) {
        await peerConnection.addIceCandidate(iceCandidate);
        console.log(peerConnectionsRef.current);
      }
    });

    return () => {
      socketClient.removeAllListeners();
    };
  }, []);

  return (
    <ChatSocketContainer isChatRoom={isChatRoom}>
      <Button width={6} bgColor="secondary" onClick={handleChatRoomLeave}>
        <LeaveChatButtonIcon>{getIcons("exit", 24)}나가기</LeaveChatButtonIcon>
      </Button>
      {socketIds.map((socketId) => {
        const stream = chat.streams[socketId];
        return <Audio key={socketId} stream={stream}></Audio>;
      })}
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
