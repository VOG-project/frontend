import { setCookie, getCookie } from "cookies-next";
import { IncomingMessage } from "http";

const ACCESS_TOKEN = "ACCESS_TOKEN";

const setAccessToken = (accessToken: string) => {
  setCookie(ACCESS_TOKEN, accessToken);
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

export { setAccessToken, getAccessToken };
