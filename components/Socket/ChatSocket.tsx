import { useEffect, useRef } from "react";
import tw, { styled } from "twin.macro";
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
  userId,
  isChatRoom,
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
          urls: ["stun:stun.l.google.com:19302"],
        },
      ],
    });

    try {
      const stream = await navigator.mediaDevices.getUserMedia(CONSTRAINTS);
      console.log("getUserMedia : ", navigator, stream);
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });
    } catch (error) {
      console.error("getTrack error: ", error);
    }

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
      chatParticipant.forEach((participant) => {
        if (participant.userId !== userId) {
          createPeerConnection(participant.socketId);
        }
      });
      setChat((prev) => {
        return { ...prev, roomId, chatParticipant, title };
      });
    });

    socketClient.on("welcome", async (socketId) => {
      try {
        if (peerConnectionsRef.current) {
          const peerConnection = peerConnectionsRef.current[socketId];
          const offer = await peerConnection.createOffer({
            offerToReceiveAudio: true,
          });
          peerConnection.setLocalDescription(offer);
          socketClient.emit("offer", { targetId: socketId, offer });
          console.log("sent offer");
        }
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
      try {
        if (peerConnectionsRef.current) {
          const peerConnection = peerConnectionsRef.current[socketId];
          console.log("received offer");

          await peerConnection.setRemoteDescription(offer);
          const answer = await peerConnection.createAnswer({
            offerToReceiveAudio: true,
          });
          peerConnection.setLocalDescription(answer);
          socketClient.emit("answer", { targetId: socketId, answer });
          console.log("sent answer");
        }
      } catch (error) {
        console.error(error);
      }
    });

    socketClient.on("answer", async (data) => {
      const { socketId, answer } = data;
      try {
        const peerConnection = peerConnectionsRef.current[socketId];
        await peerConnection.setRemoteDescription(answer);
        console.log("received answer", peerConnection);
      } catch (error) {
        console.error(error);
      }
    });

    socketClient.on("iceCandidate", async (data) => {
      const { socketId, iceCandidate } = data;
      const peerConnection = peerConnectionsRef.current[socketId];
      if (peerConnection) {
        await peerConnection.addIceCandidate(iceCandidate);
        console.log("addIcecandidate", iceCandidate);
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
    <ChatSocketContainer isChatRoom={isChatRoom}>
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

const ChatSocketContainer = styled.div<{ isChatRoom: boolean }>(
  ({ isChatRoom }) => [
    tw`block w-full h-16 bg-black/80`,
    isChatRoom && tw`invisible`,
  ]
);

const LeaveChatButtonIcon = tw.div`
  flex justify-center
`;
