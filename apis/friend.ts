import customAxios from "@/utils/customAxios";

const addFriendRequest = async (userId: number) => {
  const res = await customAxios().post(`/friend/${userId}`);

  return res.data;
};

const getFriendsRequest = async (userId: number) => {
  const res = await customAxios().get(`/friend/${userId}`);

  return res.data;
};

const deleteFriendRequest = async (userId: number) => {
  const res = await customAxios().delete(`/friend/${userId}`);

  return res.data;
};

export { addFriendRequest, getFriendsRequest, deleteFriendRequest };
