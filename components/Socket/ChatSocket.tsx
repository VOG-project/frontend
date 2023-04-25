import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import tw, { styled } from "twin.macro";
import DeviceSetting from "./DeviceSetting";
import Button from "../common/Button";
import Audio from "../common/Audio";
import { socketClient } from "@/utils/socketClient";
import { getIcons } from "../icons";
import { ChatSocketProps } from "@/types/chat";
import { ChatState } from "@/types/chat";

const ChatSocket = ({
  chat,
  isChatRoom,
  peerConnectionsRef,
  localStreamRef,
  setChat,
  socketConnect,
  getLocalStream,
  getDevices,
  handleChatRoomLeave,
  handleMicMuteClick,
  handleVolumeMuteClick,
  handleTitleClick,
  handleUserProfileOpen,
}: ChatSocketProps) => {
  const iceCandidateRef = useRef<{ [ket: string]: Array<RTCIceCandidate> }>({});
  const [isShow, setIsShow] = useState(false);

  const processAddCandidate = (
    socketId: string,
    peerConnection: RTCPeerConnection
  ) => {
    if (iceCandidateRef.current[socketId]) {
      iceCandidateRef.current[socketId].map((iceCandidate) => {
        peerConnection.addIceCandidate(iceCandidate);
        iceCandidateRef.current[socketId] = [];
      });
    }
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
      localStreamRef.current.getAudioTracks().forEach((track) => {
        if (!localStreamRef.current) return;
        peerConnection.addTrack(track, localStreamRef.current);
      });
    }

    return peerConnection;
  };

  useEffect(() => {
    socketConnect();
    (async () => {
      await getLocalStream();
    })();

    socketClient.on("setChat", (data: ChatState) => {
      const { roomId, chatParticipant, title } = data;
      setChat((prev) => {
        return { ...prev, roomId, chatParticipant, title };
      });
    });

    socketClient.on("welcome", async (socketId) => {
      const peerConnection = createPeerConnection(socketId);
      const offer = await peerConnection.createOffer({
        offerToReceiveAudio: true,
      });
      peerConnection.setLocalDescription(offer);
      console.log("send offer: ", offer);
      socketClient.emit("offer", { targetId: socketId, offer: offer });
    });

    socketClient.on("inputChat", (data) => {
      setChat((prev) => {
        const user = chat.chatParticipant.find((participant) => {
          const nickname = participant.user.nickname;
          return nickname === data.nickname;
        });
        return {
          ...prev,
          messages: [
            ...prev.messages,
            { ...data, profileUrl: user?.user.profileUrl, isSender: false },
          ],
        };
      });
    });

    socketClient.on("leaveMember", (data) => {
      const { socketId } = data;
      console.log("유저나감", socketId, peerConnectionsRef.current);
      peerConnectionsRef.current[socketId].close();
    });

    socketClient.on("offer", async (data) => {
      const { socketId, offer } = data;
      console.log("getOffer", socketId, offer);
      const peerConnection = createPeerConnection(socketId);
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer({
        offerToReceiveAudio: true,
      });
      peerConnection.setLocalDescription(answer);
      console.log("send answer: ", answer);
      socketClient.emit("answer", { targetId: socketId, answer: answer });
      processAddCandidate(socketId, peerConnection);
    });

    socketClient.on("answer", async (data) => {
      const { socketId, answer } = data;
      console.log("getAnswer", socketId, answer);
      const peerConnection = peerConnectionsRef.current[socketId];
      console.log(peerConnection);
      await peerConnection.setRemoteDescription(answer);
      processAddCandidate(socketId, peerConnection);
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
      <ChatTitle onClick={handleTitleClick}>
        #{chat.title}
        <Notification></Notification>
      </ChatTitle>
      <ButtonContainer isChatRoom={isChatRoom}>
        <MiceMute
          type="button"
          width={2.5}
          height={2.5}
          bgColor="transparent"
          onClick={handleMicMuteClick}
        >
          <MuteIcon isMuted={chat.isMicMuted}>
            {chat.isMicMuted ? getIcons("micMute", 24) : getIcons("mic", 24)}
          </MuteIcon>
        </MiceMute>
        <VolumeMute
          type="button"
          width={2.5}
          height={2.5}
          bgColor="transparent"
          onClick={handleVolumeMuteClick}
        >
          <MuteIcon isMuted={chat.isVolumeMuted}>
            {chat.isVolumeMuted
              ? getIcons("volumeMute", 24)
              : getIcons("volume", 24)}
          </MuteIcon>
        </VolumeMute>
        <Setting
          type="button"
          bgColor="transparent"
          width={2.5}
          height={2.5}
          onClick={() => setIsShow((prev) => !prev)}
        >
          <SettingIcon>{getIcons("setting", 24)}</SettingIcon>
        </Setting>
      </ButtonContainer>
      <MemberContainer>
        {chat.chatParticipant.map((member) => (
          <MemberIcon key={member.userId}>
            <Member
              src={member.user.profileUrl || "/image/blank_profile.png"}
              width={64}
              height={64}
              alt="member"
              onClick={() => handleUserProfileOpen(member.userId)}
            ></Member>
          </MemberIcon>
        ))}
      </MemberContainer>
      <LeaveChatButtonContainer>
        <Button width={6} bgColor="secondary" onClick={handleChatRoomLeave}>
          <LeaveChatButtonIcon>
            {getIcons("exit", 24)}나가기
          </LeaveChatButtonIcon>
        </Button>
      </LeaveChatButtonContainer>
      {chat.streams.map((stream) => {
        return (
          <Audio
            key={stream.socketId}
            stream={stream.stream}
            isMuted={chat.isVolumeMuted}
          ></Audio>
        );
      })}
      {isShow && (
        <DeviceSetting
          setIsShow={setIsShow}
          isChatRoom={isChatRoom}
          peerConnectionsRef={peerConnectionsRef}
          localStreamRef={localStreamRef}
          getLocalStream={getLocalStream}
          getDevices={getDevices}
        />
      )}
    </ChatSocketContainer>
  );
};

export default ChatSocket;

const ChatSocketContainer = tw.div`
  flex items-center w-full h-16 px-8 bg-white/10
`;

const LeaveChatButtonContainer = tw.div`
  ml-auto
`;

const LeaveChatButtonIcon = tw.div`
  flex justify-center
`;

const ChatTitle = tw.div`
  relative w-1/6 py-1 px-2 rounded shadow-inner shadow-black text-3xl font-bold cursor-pointer bg-black/30
  hover:bg-white/30
`;

const Notification = tw.span`
  absolute right-1 w-4 h-4 rounded-full bg-red-700 animate-pulse
`;

const MemberContainer = tw.div`
  w-[22.5rem] h-14 px-1 border-x border-neutral-600
`;

const MemberIcon = tw.div`
  cursor-pointer
`;

const Member = tw(Image)`
  float-left w-14 h-14 mx-2 bg-black rounded-full
`;

const ButtonContainer = styled.div<{ isChatRoom: boolean }>(
  ({ isChatRoom }) => [
    tw`flex px-8 gap-2`,
    isChatRoom && tw`absolute -top-36 left-[20.5rem]`,
  ]
);

const MiceMute = tw(Button)``;

const VolumeMute = tw(Button)``;

const Setting = tw(Button)``;

const MuteIcon = styled.div<{ isMuted: boolean }>(({ isMuted }) => [
  tw`flex items-center justify-center w-full h-full rounded`,
  isMuted && tw`shadow-inner shadow-black text-secondary bg-black/30`,
]);

const SettingIcon = tw.div`
  flex items-center justify-center w-full h-full rounded
`;
