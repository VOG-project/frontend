import { useRef, useEffect, useState, MutableRefObject } from "react";
import tw from "twin.macro";
import useMediaDevice from "@/hooks/useMediaDevice";
import Modal from "../common/Modal/Modal";

interface DeviceSettingModalProps {
  peerConnectionsRef: MutableRefObject<{ [key: string]: RTCPeerConnection }>;
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
}

const DeviceSettingModal = ({
  peerConnectionsRef,
  isOpen,
  handleClose,
  handleConfirm,
}: DeviceSettingModalProps) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
  const { localStreamRef, getDevices } = useMediaDevice();
  const currentDevice = localStreamRef.current?.getAudioTracks()[0];

  useEffect(() => {
    (async () => {
      const audios = await getDevices();
      setDevices(audios);
    })();
  }, []);

  return (
    <Modal
      title="설정"
      isOpen={isOpen}
      hasFooter={true}
      handleClose={handleClose}
      handleConfirm={handleConfirm}
    >
      <DevicesSelect
        onChange={() => {
          // getLocalStream(selectRef.current?.value);
          console.log(peerConnectionsRef.current);
          Object.values(peerConnectionsRef.current).forEach(
            (peerConnection) => {
              console.log(peerConnection);
            }
          );
        }}
        ref={selectRef}
      >
        {devices.map((device) => (
          <DeviceOption
            key={device.deviceId}
            value={device.deviceId}
            selected={currentDevice?.label === device.label}
          >
            {device.label}
          </DeviceOption>
        ))}
      </DevicesSelect>
    </Modal>
  );
};

export default DeviceSettingModal;

const DevicesSelect = tw.select`
  h-8 px-2 rounded bg-neutral-900
`;

const DeviceOption = tw.option`
  focus:bg-black
`;
