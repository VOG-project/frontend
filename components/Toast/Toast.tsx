import { useRecoilValue } from "recoil";
import tw from "twin.macro";
import ToastText from "./ToastText";
import { toastState } from "@/recoil/atoms/toastState";

const Toast = () => {
  const toast = useRecoilValue(toastState);

  return (
    <ToastContainer>
      {toast.map(
        (item) =>
          item.type && (
            <ToastText
              key={item.key}
              type={item.type}
              text={item.text}
              uuid={item.key}
            />
          )
      )}
    </ToastContainer>
  );
};

export default Toast;

const ToastContainer = tw.div`
  fixed w-full h-auto z-[100]
`;
