import { selector } from "recoil";
import { getAccessToken } from "@/utils/tokenManager";

export const loginState = selector({
  key: "IsLogin",
  get: () => {
    const accessToken = getAccessToken();

    if (accessToken) {
      return true;
    } else {
      return false;
    }
  },
});
