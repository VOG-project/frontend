import { useRef } from "react";
import useChatState from "./useChatState";

const CONSTRAINTS = {
  audio: true,
  video: false,
};

const useMediaDevice = () => {
  const peerConnectionsRef = useRef<{ [key: string]: RTCPeerConnection }>({});
  const localStreamRef = useRef<MediaStream>();
  const { chat, setChat } = useChatState();

  const getLocalStream = async (deviceId?: string) => {
    console.log(deviceId);
    const localStream = await navigator.mediaDevices.getUserMedia(
      deviceId
        ? { audio: { deviceId: { exact: deviceId } }, video: false }
        : CONSTRAINTS
    );
    localStreamRef.current = localStream;
  };

  const getDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const audios = devices.filter((device) => device.kind === "audioinput");

    return audios;
  };

  const handleMicMuteClick = () => {
    if (!localStreamRef.current) return;

    const isMicMuted = chat.isMicMuted;
    setChat((prev) => {
      return { ...prev, isMicMuted: !isMicMuted };
    });
    localStreamRef.current
      .getAudioTracks()
      .forEach((track) => (track.enabled = isMicMuted));
  };

  const handleVolumeMuteClick = () => {
    setChat((prev) => {
      return { ...prev, isVolumeMuted: !prev.isVolumeMuted };
    });
  };

  return {
    peerConnectionsRef,
    localStreamRef,
    getLocalStream,
    getDevices,
    handleMicMuteClick,
    handleVolumeMuteClick,
  };
};

export default useMediaDevice;
