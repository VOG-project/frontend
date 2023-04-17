import { CookieValueTypes } from "cookies-next";
import customAxios from "@/utils/customAxios";

const createChatRoomRequest = async (
  userId: number,
  title: string,
  description: string,
  maximumMember: number
) => {
  const res = await customAxios.post("/chats/rooms", {
    userId,
    title,
    description,
    maximumMember,
  });

  return res.data;
};

const joinChatRoomRequest = async (roomId: string, userId: number) => {
  const res = await customAxios.get(`/chats/rooms/${roomId}`, {
    params: { userId: userId },
  });

  return res.data;
};

const getChatRoomsRequest = async (
  page: number,
  accessToken?: CookieValueTypes
) => {
  const res = await customAxios.get("/chats/rooms/list", {
    headers: accessToken
      ? { Authorization: `bearer ${accessToken}` }
      : undefined,
    params: {
      page,
    },
  });

  return res.data;
};

const searchChatRoomsRequest = async (title: string, page: number) => {
  const res = await customAxios.get("/chats/rooms", {
    params: {
      title: title,
      page: page,
    },
  });

  return res.data;
};

export {
  createChatRoomRequest,
  joinChatRoomRequest,
  getChatRoomsRequest,
  searchChatRoomsRequest,
};
