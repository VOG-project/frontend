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
    const audioConstraints = {
      audio: { deviceId: { exact: deviceId } },
      video: false,
    };
    try {
      const localStream = await navigator.mediaDevices.getUserMedia(
        deviceId ? audioConstraints : CONSTRAINTS
      );
      localStreamRef.current = localStream;
    } catch (error) {
      console.error(error);
    }
  };

  const getDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audios = devices.filter((device) => device.kind === "audioinput");
      return audios;
    } catch (error) {
      console.error(error);
    }
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
