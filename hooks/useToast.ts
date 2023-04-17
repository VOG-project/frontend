import { useSetRecoilState } from "recoil";
import { toastState } from "@/recoil/atoms/toastState";
import { v4 as uuidv4 } from "uuid";

const useToast = () => {
  const setToast = useSetRecoilState(toastState);

  const toast = {
    success: (text: string) => {
      setToast((prev) => {
        return [...prev, { key: uuidv4(), type: "success", text: text }];
      });
    },
    alert: (text: string) => {
      setToast((prev) => {
        return [...prev, { key: uuidv4(), type: "alert", text: text }];
      });
    },
  };

  const closeToast = (uuid: string) => {
    setToast((prev) => {
      return prev.filter((item) => item.key !== uuid);
    });
  };

  return { toast, closeToast };
};

export default useToast;
