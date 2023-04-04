import { socketClient } from "@/utils/socketClient";
import useChatState from "./useChatState";

const RTC_CONFIG = {
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
};

const CONSTRAINTS = {
  audio: true,
};

const useWebRTC = () => {
  const { setChat } = useChatState();
  const peerConnections: { [socketId: string]: RTCPeerConnection } = {};

  const createPeerConnection = async (socketId: string) => {
    const peerConnection = new RTCPeerConnection(RTC_CONFIG);

    navigator.mediaDevices.getUserMedia(CONSTRAINTS).then((stream) => {
      stream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, stream);
      });
    });

    peerConnection.onicecandidate = (e) => {
      if (e.candidate) {
        socketClient.emit("iceCandidate", {
          targetId: socketId,
          iceCandidate: e.candidate,
        });
      }
    };

    // 상대방 sdp가 remoteSessionDescription으로 지정하면 상대방 track에 대한 addTrack 이벤트가 발생
    peerConnection.ontrack = (e) => {
      console.log("track 이벤트 발생 :", e);
      setChat((prev) => {
        return {
          ...prev,
          streams: { ...prev.streams, [socketId]: e.streams[0] },
        };
      });
    };

    if (!(socketId in peerConnections)) {
      peerConnections[socketId] = peerConnection;
    }

    return peerConnection;
  };

  const sendOffer = async (socketId: string) => {
    console.log(peerConnections);
    const peerConnection = peerConnections[socketId];
    const offer = await peerConnection.createOffer({
      offerToReceiveAudio: true,
    });
    await peerConnection.setLocalDescription(offer);
    socketClient.emit("offer", { targetId: socketId, offer });
  };

  const getOffer = async (socketId: string, offer: RTCSessionDescription) => {
    const peerConnection = peerConnections[socketId];
    await peerConnection.setRemoteDescription(offer);
    console.log(peerConnections);
    const answer = await peerConnection.createAnswer({
      offerToReceiveAudio: true,
    });
    await peerConnection.setLocalDescription(answer);
    socketClient.emit("answer", { targetId: socketId, answer });
  };

  const getAnswer = async (socketId: string, answer: RTCSessionDescription) => {
    const peerConnection = peerConnections[socketId];
    await peerConnection.setRemoteDescription(answer);
    console.log("getAnswer", peerConnections);
  };

  const getIceCandidate = async (
    socketId: string,
    iceCandidate: RTCIceCandidate
  ) => {
    const peerConnection = peerConnections[socketId];
    await peerConnection.addIceCandidate(iceCandidate);
  };

  return {
    createPeerConnection,
    sendOffer,
    getOffer,
    getAnswer,
    getIceCandidate,
  };
};

export default useWebRTC;
