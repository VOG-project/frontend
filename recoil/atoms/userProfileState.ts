import { atom } from "recoil";
import { UserState } from "./userState";

interface UserProfileState extends UserState {
  isOpen: boolean;
}

export const userProfileState = atom<UserProfileState>({
  key: "UserProfile",
  default: {
    isOpen: false,
    nickname: "",
    email: "",
    profileUrl: "/image/blank_profile.png",
    id: null,
    sex: "",
  },
});
