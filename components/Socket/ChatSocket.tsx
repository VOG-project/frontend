import { useEffect, useRef } from "react";
import tw, { styled } from "twin.macro";
import Button from "../common/Button";
import { socketClient } from "@/utils/socketClient";
import { getIcons } from "../icons";
import { ChatSocketProps } from "@/types/chat";

const ChatSocket = ({
  isChatRoom,
  roomId,
  setChat,
  socketConnect,
  handleChatRoomLeave,
}: ChatSocketProps) => {
  const peerStreamRef = useRef<HTMLAudioElement>(null);
  const myStreamRef = useRef<HTMLAudioElement>(null);
  const constraints = {
    audio: true,
  };

  useEffect(() => {
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
    if (peerConnection) {
      peerConnection.onicecandidate = (e) => {
        if (e.candidate) {
          socketClient.emit("iceCandidate", {
            iceCandidate: e.candidate,
            roomId,
          });
        }
      };
      peerConnection.ontrack = (e) => {
        if (peerStreamRef.current) {
          peerStreamRef.current.srcObject = e.streams[0];
        }
      };
    }

    socketConnect();
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        stream
          .getTracks()
          .forEach((track) => peerConnection.addTrack(track, stream));
        if (myStreamRef.current) {
          myStreamRef.current.srcObject = stream;
        }
        console.log(stream.getAudioTracks());
      })
      .catch((error) => console.error("에러가 발생했습니다.", error));

    socketClient.on("setChat", async (data) => {
      const { roomId, chatParticipant, title } = data;
      setChat((prev) => {
        return { ...prev, roomId, chatParticipant, title };
      });
    });

    socketClient.on("welcome", async () => {
      const offer = await peerConnection.createOffer();
      peerConnection.setLocalDescription(offer);
      console.log("send offer : ", offer);
      socketClient.emit("offer", { offer, roomId });
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

    socketClient.on("offer", async (offer) => {
      console.log("receive offer : ", offer);
      peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      peerConnection.setLocalDescription(answer);
      console.log("send answer : ", answer);
      socketClient.emit("answer", { answer, roomId });
    });

    socketClient.on("answer", (answer) => {
      console.log("receive answer : ", answer);
      peerConnection.setRemoteDescription(answer);
    });

    socketClient.on("iceCandidate", async (iceCandidate) => {
      console.log("get iceCandidate", iceCandidate);
      await peerConnection.addIceCandidate(iceCandidate);
    });

    return () => {
      socketClient.removeAllListeners();
    };
  }, []);

  return (
    <ChatSocketContainer isChatRoom={isChatRoom}>
      <Button width={6} bgColor="secondary" onClick={handleChatRoomLeave}>
        <LeaveChatButtonIcon>{getIcons("exit", 24)}나가기</LeaveChatButtonIcon>
        <audio ref={myStreamRef}></audio>
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
