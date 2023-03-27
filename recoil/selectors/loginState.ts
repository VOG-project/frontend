import { selector } from "recoil";
import { userState } from "../atoms/userState";

export const loginState = selector({
  key: "IsLogin",
  get: ({ get }) => {
    const user = get(userState);
    const userId = user.userId;

    if (userId) {
      return true;
    } else {
      return false;
    }
  },
});
