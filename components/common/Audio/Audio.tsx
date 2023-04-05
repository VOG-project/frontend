import { useRef, useEffect } from "react";

interface AudioProps {
  stream: MediaStream;
}

const Audio = ({ stream }: AudioProps) => {
  const streamRef = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (streamRef.current) {
      streamRef.current.srcObject = stream;
    }
  }, [stream]);
  return <audio ref={streamRef} autoPlay></audio>;
};

export default Audio;
