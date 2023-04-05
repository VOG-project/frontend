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
  const [streams, setStreams] = useState<MediaStream[]>([]);
  const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});

  const createPeerConnection = async (socketId: string) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: ["stun:stun.l.google.com:19302"],
        },
      ],
    });
    // navigator.mediaDevices
    //   .getUserMedia(CONSTRAINTS)
    //   .then((stream) =>
    //     stream
    //       .getTracks()
    //       .forEach((track) => peerConnection.addTrack(track, stream))
    //   );
    try {
      const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
      stream.getTracks().forEach((track) => {
        console.log(track);
        peerConnection.addTrack(track, stream);
      });
    } catch (error) {
      console.error(error);
    }

    peerConnection.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("emit iceCandidate", e.candidate);
        socketClient.emit("iceCandidate", {
          targetId: socketId,
          iceCandidate: e.candidate,
        });
      }
    };

    peerConnection.ontrack = (e) => {
      const stream = e.streams[0];
      if (stream) {
        setChat((prev) => {
          return { ...prev, streams: { ...prev.streams, [socketId]: stream } };
        });
      }
    };

    peerConnection.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    if (peerConnectionsRef.current) {
      // peerConnectionsRef.current[socketId] = peerConnection;
      peerConnectionsRef.current = {
        ...peerConnectionsRef.current,
        [socketId]: peerConnection,
      };
    }

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
      try {
        const peerConnection = await createPeerConnection(socketId);
        const offer = await peerConnection.createOffer();
        peerConnection.setLocalDescription(offer);
        socketClient.emit("offer", { targetId: socketId, offer });
        console.log("sent offer");
      } catch (error) {
        console.error(error);
      }
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
      const answer = await peerConnection.createAnswer();
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
      {Object.values(chat.streams).map((stream) => (
        <Audio stream={stream}></Audio>
      ))}
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
