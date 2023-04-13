import { useRecoilState } from "recoil";
import { loadingState } from "@/recoil/atoms/loadingState";

const useLoadingState = () => {
  const [isLoading, setIsLoading] = useRecoilState(loadingState);

  const setLoadingTrue = () => {
    setIsLoading(true);
  };

  const setLoadingFalse = () => {
    setIsLoading(false);
  };

  return { isLoading, setLoadingTrue, setLoadingFalse };
};

export default useLoadingState;
