import customAxios from "@/utils/customAxios";

const getLikeListRequest = async (postId: number) => {
  const res = await customAxios().get(`/like/${postId}`);

  return res.data;
};

const addLikePostRequest = async (userId: number, postId: number) => {
  const res = await customAxios().post(`/like/${postId}`, {
    userId,
  });

  return res.data;
};

const cancelLikePostRequset = async (userId: number, postId: number) => {
  const res = await customAxios().patch(`/like/${postId}`, {
    userId,
  });

  return res.data;
};

export { getLikeListRequest, addLikePostRequest, cancelLikePostRequset };
