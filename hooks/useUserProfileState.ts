import { useRecoilState, useResetRecoilState } from "recoil";
import { userProfileState } from "@/recoil/atoms/userProfileState";
import { getUserInfoRequest } from "@/apis/user";

const useUserProfileState = () => {
  const [userProfile, setUserProfile] = useRecoilState(userProfileState);
  const resetUserProfile = useResetRecoilState(userProfileState);
  const isOpen = userProfile.isOpen;

  const handleUserProfileOpen = async (userId: number | null) => {
    if (!userId) return;
    const res = await getUserInfoRequest(userId);
    if (res.success) {
      console.log(res);
      setUserProfile((prev) => {
        return {
          ...prev,
          isOpen: true,
          ...res.result,
        };
      });
    }
  };

  const handleUserProfileClose = () => {
    resetUserProfile();
  };

  return { isOpen, userProfile, handleUserProfileOpen, handleUserProfileClose };
};

export default useUserProfileState;
