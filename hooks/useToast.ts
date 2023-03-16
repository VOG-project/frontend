import { useSetRecoilState } from "recoil";
import { toastState } from "@/recoil/atoms/toastState";

const useToast = () => {
  const setToast = useSetRecoilState(toastState);

  const toast = {
    success: (text: string) => {
      setToast({ type: "success", text: text });
    },
    alert: (text: string) => {
      setToast({ type: "alert", text: text });
    },
  };

  const closeToast = () => {
    setToast({ type: null, text: "" });
  };

  return { toast, closeToast };
};

export default useToast;
