import { atom } from "recoil";
import { UserState } from "./userState";

interface UserProfileState extends UserState {
  isOpen: boolean;
}

export const userProfileState = atom<UserProfileState>({
  key: "UserProfile",
  default: {
    oauthId: "",
    provider: "",
    isOpen: false,
    nickname: "",
    profileUrl: "/image/blank_profile.png",
    id: null,
    sex: "",
  },
});
