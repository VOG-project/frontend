import customAxios from "@/utils/customAxios";

const getCommentsRequest = async (postId: number, page: number = 1) => {
  const res = await customAxios().get(`/comments`, {
    params: {
      postId: postId,
      page: page,
    },
  });

  return res.data;
};

const createCommentRequest = async (
  userId: number,
  postId: number,
  content: string
) => {
  const res = await customAxios().post("/comments", {
    writerId: userId,
    postId,
    content,
  });

  return res.data;
};

const deleteCommentRequest = async (commentId: number) => {
  const res = await customAxios().delete(`/comments/${commentId}`);

  return res.data;
};

const editCommentRequest = async (commentId: number, content: string) => {
  const res = await customAxios().patch(`/comments/${commentId}`, {
    content: content,
  });

  return res.data;
};

export {
  getCommentsRequest,
  createCommentRequest,
  deleteCommentRequest,
  editCommentRequest,
};
