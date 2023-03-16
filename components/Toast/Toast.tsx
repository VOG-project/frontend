import { useRecoilValue } from "recoil";
import tw from "twin.macro";
import ToastText from "./ToastText";
import { toastState } from "@/recoil/atoms/toastState";

const Toast = () => {
  const toast = useRecoilValue(toastState);

  return (
    <ToastContainer>
      {toast.type && <ToastText type={toast.type} text={toast.text} />}
    </ToastContainer>
  );
};

export default Toast;

const ToastContainer = tw.div`
  fixed w-full h-auto z-50
`;
