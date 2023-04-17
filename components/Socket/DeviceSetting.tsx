import {
  useEffect,
  useState,
  MutableRefObject,
  SetStateAction,
  Dispatch,
} from "react";
import tw, { styled } from "twin.macro";
import Button from "@/components/common/Button";

interface DeviceSettingModalProps {
  setIsShow: Dispatch<SetStateAction<boolean>>;
  isChatRoom: boolean;
  peerConnectionsRef: MutableRefObject<{ [key: string]: RTCPeerConnection }>;
  localStreamRef: MutableRefObject<MediaStream | undefined>;
  getLocalStream: (deviceId?: string) => Promise<void>;
  getDevices: () => Promise<MediaDeviceInfo[] | undefined>;
}

const DeviceSetting = ({
  setIsShow,
  isChatRoom,
  peerConnectionsRef,
  localStreamRef,
  getLocalStream,
  getDevices,
}: DeviceSettingModalProps) => {
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const [currentDevice, setCurrentDevice] = useState<MediaStreamTrack>();

  useEffect(() => {
    if (localStreamRef.current) {
      const device = localStreamRef.current.getAudioTracks()[0];
      setCurrentDevice(device);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const audios = await getDevices();
      if (audios) {
        setDevices(audios);
      }
    })();
  }, []);

  return (
    <DeviceSettingContainer isChatRoom={isChatRoom}>
      <DeviceSettingTitle>세팅</DeviceSettingTitle>
      <DevicesSelect
        onChange={async (e) => {
          const deviceId = e.target.value;
          localStreamRef.current
            ?.getAudioTracks()
            .forEach((track) => track.stop());
          await getLocalStream(deviceId);
          Object.values(peerConnectionsRef.current).forEach(
            (peerConnection) => {
              if (!localStreamRef.current) return;
              const audioTrack = localStreamRef.current?.getAudioTracks()[0];
              const sender = peerConnection
                .getSenders()
                .find((sender) => sender.track!.kind === "audio");
              sender?.replaceTrack(audioTrack);
            }
          );
        }}
      >
        {devices.map((device) => (
          <DeviceOption
            key={device.deviceId}
            value={device.deviceId}
            selected={device.label === currentDevice?.label}
          >
            {device.label}
          </DeviceOption>
        ))}
      </DevicesSelect>
      <Triangle></Triangle>
      <Button
        type="button"
        bgColor="secondary"
        onClick={() => setIsShow(false)}
      >
        닫기
      </Button>
    </DeviceSettingContainer>
  );
};

export default DeviceSetting;

const DeviceSettingContainer = styled.div<{ isChatRoom: boolean }>(
  ({ isChatRoom }) => [
    tw`absolute flex flex-col items-center justify-center bottom-20 left-[30%] w-1/4 p-4 rounded bg-zinc-800`,
    isChatRoom && tw`bottom-[320%] left-[22rem]`,
  ]
);

const DeviceSettingTitle = tw.div`
  w-full h-12 p-1 text-xl
`;

const Triangle = tw.div`
  absolute w-0 h-0 -bottom-4 left-[7.5rem] border-8 border-b-transparent border-t-zinc-800 border-x-transparent
`;

const DevicesSelect = tw.select`
  w-full h-8 px-2 rounded bg-neutral-900
`;

const DeviceOption = tw.option`
  focus:bg-black
`;
