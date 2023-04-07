import { useEffect, useRef } from "react";
import tw from "twin.macro";
import Button from "../common/Button";
import Audio from "../common/Audio";
import { socketClient } from "@/utils/socketClient";
import { getIcons } from "../icons";
import { ChatSocketProps } from "@/types/chat";
import { ChatState } from "@/types/chat";

const CONSTRAINTS = {
  audio: true,
};

const ChatSocket = ({
  chat,
  setChat,
  socketConnect,
  handleChatRoomLeave,
}: ChatSocketProps) => {
  const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});
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

    await navigator.mediaDevices
      .getUserMedia(CONSTRAINTS)
      .then((stream) => {
        console.log("add stream", stream);
        stream
          .getTracks()
          .forEach((track) => peerConnection.addTrack(track, stream));
      })
      .catch((error) => console.error(error));

    peerConnection.onicecandidate = (e) => {
      console.log("icecandidate");
      if (e.candidate) {
        console.log("onicecandidate", e.candidate);
        socketClient.emit("iceCandidate", {
          targetId: socketId,
          iceCandidate: e.candidate,
        });
      }
    };

    peerConnection.ontrack = (e) => {
      console.log("ontrack");
      const stream = e.streams[0];
      if (stream) {
        setChat((prev) => {
          return { ...prev, streams: [...prev.streams, { socketId, stream }] };
        });
      }
    };

    peerConnection.oniceconnectionstatechange = (e) => {
      console.log(e);
    };

    if (peerConnectionsRef.current) {
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
      setChat((prev) => {
        return { ...prev, roomId, chatParticipant, title };
      });
    });

    socketClient.on("welcome", async (socketId) => {
      const peerConnection = await createPeerConnection(socketId);
      const offer = await peerConnection.createOffer();
      peerConnection.setLocalDescription(offer);
      socketClient.emit("offer", { targetId: socketId, offer: offer });
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
      console.log("getOffer", socketId, offer);
      const peerConnection = await createPeerConnection(socketId);
      peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      peerConnection.setLocalDescription(answer);
      socketClient.emit("answer", { targetId: socketId, answer: answer });
    });

    socketClient.on("answer", (data) => {
      const { socketId, answer } = data;
      console.log("getAnswer", socketId, answer);
      const peerConnection = peerConnectionsRef.current[socketId];
      peerConnection.setRemoteDescription(answer);
    });

    socketClient.on("iceCandidate", (data) => {
      const { socketId, iceCandidate } = data;
      console.log("getCandidate", socketId, iceCandidate);
      const peerConnection = peerConnectionsRef.current[socketId];
      if (peerConnection) {
        peerConnection.addIceCandidate(iceCandidate);
      }
    });

    return () => {
      socketClient.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    console.log(chat.streams);
  }, [chat]);

  return (
    <ChatSocketContainer>
      <Button
        width={6}
        bgColor="secondary"
        onClick={() => {
          if (peerConnectionsRef.current) {
            Object.values(peerConnectionsRef.current).forEach(
              (peerConnection) => peerConnection.close()
            );
          }
          handleChatRoomLeave();
        }}
      >
        <LeaveChatButtonIcon>{getIcons("exit", 24)}나가기</LeaveChatButtonIcon>
      </Button>
      {chat.streams.map((stream) => {
        return <Audio key={stream.socketId} stream={stream.stream}></Audio>;
      })}
    </ChatSocketContainer>
  );
};

export default ChatSocket;

const ChatSocketContainer = tw.div`
  block w-full h-16 bg-black/80
`;

const LeaveChatButtonIcon = tw.div`
  flex justify-center
`;
