import customAxios from "@/utils/customAxios";

const createChatRoomRequest = async (
  userId: number,
  title: string,
  maximumMember: number
) => {
  const res = await customAxios().post("/chats/rooms", {
    userId,
    title,
    maximumMember,
  });

  return res.data;
};

const joinChatRoomRequest = async (roomId: string, userId: number) => {
  const res = await customAxios().post(`/chats/rooms/${roomId}`, {
    userId,
  });

  return res.data;
};

const getChatRoomsRequest = async (page: number) => {
  const res = await customAxios().get("/chats/rooms", {
    params: {
      page,
    },
  });

  return res.data;
};

const getChatRoomCountRequest = async () => {
  const res = await customAxios().get("/chats/rooms/count");

  return res.data;
};

export {
  createChatRoomRequest,
  joinChatRoomRequest,
  getChatRoomsRequest,
  getChatRoomCountRequest,
};
