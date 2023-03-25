import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "@/recoil/atoms/userState";

const useUserState = () => {
  const [user, setUser] = useRecoilState(userState);
  const resetUser = useResetRecoilState(userState);

  const userId = user.userId;

  return {
    user,
    userId,
    setUser,
    resetUser,
  };
};

export default useUserState;
