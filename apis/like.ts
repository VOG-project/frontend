import customAxios from "@/utils/customAxios";

const getLikeListRequest = async (postId: number) => {
  const res = await customAxios().get(`/like/${postId}`);

  return res.data;
};

const addLikePostRequest = async (postId: number) => {
  const res = await customAxios().post(`/like/${postId}`);

  return res.data;
};

const cancelLikePostRequset = async (postId: number) => {
  const res = await customAxios().patch(`/like/${postId}`);

  return res.data;
};

export { getLikeListRequest, addLikePostRequest, cancelLikePostRequset };
