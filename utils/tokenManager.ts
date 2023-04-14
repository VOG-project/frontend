import { setCookie, getCookie, deleteCookie } from "cookies-next";
import { IncomingMessage } from "http";

const ACCESS_TOKEN = "ACCESS_TOKEN";

const setAccessToken = (accessToken: string) => {
  setCookie(ACCESS_TOKEN, accessToken, { secure: true });
};

const getAccessToken = (
  req?: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  }
) => {
  return getCookie(ACCESS_TOKEN, { req });
};

const deleteAccessToken = () => {
  deleteCookie(ACCESS_TOKEN);
};

export { setAccessToken, getAccessToken, deleteAccessToken };
