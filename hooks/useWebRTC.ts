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
  const peerConnections: { [sokcetId: string]: RTCPeerConnection } = {};

  const createPeerConnection = async (socketId: string) => {
    const peerConnection = new RTCPeerConnection(RTC_CONFIG);

    if (!(socketId in peerConnections)) {
      peerConnections[socketId] = peerConnection;
    }

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
      console.log(e);
      setChat((prev) => {
        return {
          ...prev,
          streams: { ...prev.streams, [socketId]: e.streams[0] },
        };
      });
    };

    return peerConnection;
  };

  const sendOffer = async (socketId: string) => {
    const peerConnection = peerConnections[socketId];
    const offer = await peerConnection.createOffer();
    peerConnection.setLocalDescription(offer);
    // console.log("send offer", { socketId, offer });
    socketClient.emit("offer", { targetId: socketId, offer });
  };

  const getOffer = async (socketId: string, offer: RTCSessionDescription) => {
    const peerConnection = await createPeerConnection(socketId);
    peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();
    peerConnection.setLocalDescription(answer);
    // console.log("send answer", { socketId, answer });
    socketClient.emit("answer", { targetId: socketId, answer });
  };

  const getAnswer = async (socketId: string, answer: RTCSessionDescription) => {
    const peerConnection = peerConnections[socketId];
    peerConnection.setRemoteDescription(answer);
  };

  const getIceCandidate = (socketId: string, iceCandidate: RTCIceCandidate) => {
    const peerConnection = peerConnections[socketId];
    console.log(peerConnection);
    peerConnection.addIceCandidate(iceCandidate);
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
