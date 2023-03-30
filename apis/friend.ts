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

const deleteFriendRequest = async (userId: number, targetId: number) => {
  const res = await customAxios().patch(`/friend/${userId}`, {
    targetId: targetId,
  });

  return res.data;
};

export { addFriendRequest, getFriendsRequest, deleteFriendRequest };
