import { selector } from "recoil";
import { getAccessToken } from "@/utils/tokenManager";
import { userState } from "../atoms/userState";

export const loginState = selector({
  key: "IsLogin",
  get: ({ get }) => {
    const user = get(userState);
    const accessToken = getAccessToken();
    if (user.id && accessToken) {
      return true;
    } else {
      return false;
    }
  },
});
