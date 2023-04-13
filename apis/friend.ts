import customAxios from "@/utils/customAxios";

const addFriendRequest = async (userId: number, targetId: number) => {
  const res = await customAxios().post(`/friend/${userId}`, {
    targetId: targetId,
  });

  return res.data;
};

const getFriendsRequest = async (userId: number) => {
  const res = await customAxios().get(`/friend/${userId}`);

  return res.data;
};

const removeFriendRequest = async (userId: number, targetId: number) => {
  const res = await customAxios().patch(`/friend/${userId}`, {
    targetId: targetId,
  });

  return res.data;
};

const searchFriendRequest = async (nickname: string) => {
  const res = await customAxios().get(`/friend/search/${nickname}`);

  return res.data;
};

export {
  addFriendRequest,
  getFriendsRequest,
  removeFriendRequest,
  searchFriendRequest,
};
