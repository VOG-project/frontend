import customAxios from "@/utils/customAxios";

interface JoinChatRoomRequest {
  roomId: string;
  userId: number;
}

interface GetChatRoomsRequest {
  page: number;
}

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

const joinChatRoomRequest = async ({ roomId, userId }: JoinChatRoomRequest) => {
  const res = await customAxios().post(`/chats/rooms/${roomId}`, {
    userId,
  });

  return res.data;
};

const getChatRoomsRequest = async ({ page }: GetChatRoomsRequest) => {
  const res = await customAxios().get(`/chats/rooms/`, {
    params: {
      page,
    },
  });

  return res.data;
};
export { createChatRoomRequest, joinChatRoomRequest, getChatRoomsRequest };
