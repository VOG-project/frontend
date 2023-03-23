import { useEffect } from "react";
import tw, { styled } from "twin.macro";
import useToast from "@/hooks/useToast";
import { getIcons } from "@/components/icons";

interface ToastTextProps {
  type: "success" | "alert";
  text: string;
  uuid: string;
}

const ToastText = ({ type, text, uuid }: ToastTextProps) => {
  const { closeToast } = useToast();

  useEffect(() => {
    const timeout = setTimeout(() => {
      closeToast(uuid);
    }, 2500);
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <>
      <StyledToastText type={type}>
        {getIcons(type, 20)}
        {text}
      </StyledToastText>
    </>
  );
};

export default ToastText;

const StyledToastText = styled.p<{ type: string }>(({ type }) => [
  tw`absolute flex items-center justify-center top-24 left-1/2 h-8 px-2 min-w-[10rem] rounded shadow select-none animate-[slideInOut_2.5s_forwards]`,
  type === "success" && tw` bg-green-600`,
  type === "alert" && tw`bg-red-600`,
]);
