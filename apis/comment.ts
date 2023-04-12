import customAxios from "@/utils/customAxios";

const getCommentsRequest = async (postId: number, cursor: number = 1) => {
  const res = await customAxios().get(`/comments/${postId}`, {
    params: {
      cursor: cursor,
    },
  });

  return res.data;
};

const createCommentRequest = async (
  userId: number,
  postId: number,
  content: string,
  group: number,
  sequence: number
) => {
  const res = await customAxios().post("/comments", {
    userId,
    postId,
    content,
    group,
    sequence,
  });

  return res.data;
};

const deleteCommentRequest = async (
  group: number,
  sequence: number,
  postId: number
) => {
  const res = await customAxios().delete("/comments", {
    params: {
      group,
      sequence,
      postId,
    },
  });

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
