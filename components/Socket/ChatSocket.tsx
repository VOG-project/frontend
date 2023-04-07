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
  video: false,
};

const ChatSocket = ({
  chat,
  setChat,
  socketConnect,
  handleChatRoomLeave,
}: ChatSocketProps) => {
  const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});
  const localStreamRef = useRef<MediaStream>();
  const iceCandidateRef = useRef<{ [ket: string]: Array<RTCIceCandidate> }>({});

  const getLocalStream = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
    localStreamRef.current = localStream;
  };

  const createPeerConnection = (socketId: string) => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    });

    peerConnectionsRef.current = {
      ...peerConnectionsRef.current,
      [socketId]: peerConnection,
    };

    peerConnection.onicecandidate = (e) => {
      if (e.candidate) {
        console.log("onicecandidate", e.candidate);
        socketClient.emit("iceCandidate", {
          targetId: socketId,
          iceCandidate: e.candidate,
        });
      }
    };

    peerConnection.ontrack = (e) => {
      console.log("ontrack", e.streams);
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

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        if (!localStreamRef.current) return;
        peerConnection.addTrack(track, localStreamRef.current);
      });
    }

    return peerConnection;
  };

  useEffect(() => {
    socketConnect();
    getLocalStream();

    socketClient.on("setChat", (data: ChatState) => {
      const { roomId, chatParticipant, title } = data;
      setChat((prev) => {
        return { ...prev, roomId, chatParticipant, title };
      });
    });

    socketClient.on("welcome", async (socketId) => {
      const peerConnection = createPeerConnection(socketId);
      const offer = await peerConnection.createOffer();
      peerConnection.setLocalDescription(offer);
      console.log("send offer: ", offer);
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
      if (iceCandidateRef.current[socketId]) {
        iceCandidateRef.current[socketId].map((iceCandidate) => {
          peerConnection.addIceCandidate(iceCandidate);
          iceCandidateRef.current[socketId] = [];
        });
      }
      console.log("getOffer", socketId, offer);
      const peerConnection = createPeerConnection(socketId);
      peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      peerConnection.setLocalDescription(answer);
      console.log("send answer: ", answer);
      socketClient.emit("answer", { targetId: socketId, answer: answer });
    });

    socketClient.on("answer", (data) => {
      const { socketId, answer } = data;
      if (iceCandidateRef.current[socketId]) {
        iceCandidateRef.current[socketId].map((iceCandidate) => {
          peerConnection.addIceCandidate(iceCandidate);
          iceCandidateRef.current[socketId] = [];
        });
      }
      console.log("getAnswer", socketId, answer);
      const peerConnection = peerConnectionsRef.current[socketId];
      console.log(peerConnection);
      peerConnection.setRemoteDescription(answer);
    });

    socketClient.on("iceCandidate", (data) => {
      const { socketId } = data;
      const iceCandidate = new RTCIceCandidate(data.iceCandidate);
      const peerConnection = peerConnectionsRef.current[socketId];
      console.log("getCandidate", socketId, iceCandidate, peerConnection);
      if (peerConnection.remoteDescription == null) {
        if (!iceCandidateRef.current[socketId]) {
          iceCandidateRef.current[socketId] = [iceCandidate];
        } else {
          iceCandidateRef.current[socketId].push(iceCandidate);
        }
      } else {
        peerConnection.addIceCandidate(iceCandidate);
      }
    });

    return () => {
      socketClient.removeAllListeners();
    };
  }, []);

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
