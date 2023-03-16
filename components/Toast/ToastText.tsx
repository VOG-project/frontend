import { useEffect, useState } from "react";
import tw, { styled } from "twin.macro";
import useToast from "@/hooks/useToast";
import { getIcons } from "@/components/icons";

interface ToastTextProps {
  type: "success" | "alert";
  text: string;
}

const ToastText = ({ type, text }: ToastTextProps) => {
  const [isActive, setIsActive] = useState(true);
  const { closeToast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsActive(false);
    }, 2000);
    const timeout2 = setTimeout(() => {
      closeToast();
    }, 2500);
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeout2);
    };
  });

  return (
    <>
      <StyledToastText type={type} isActive={isActive}>
        {getIcons(type, 20)}
        {text}
      </StyledToastText>
    </>
  );
};

export default ToastText;

const StyledToastText = styled.p<{ type: string; isActive: boolean }>(
  ({ type, isActive }) => [
    tw`absolute flex items-center justify-center top-24 left-1/2 h-8 min-w-[10rem] rounded shadow`,
    isActive
      ? tw`animate-[slideIn_0.8s]`
      : tw`animate-[slideOut_0.8s_forwards]`,
    type === "success" && tw` bg-green-600`,
    type === "alert" && tw`bg-red-600`,
  ]
);
