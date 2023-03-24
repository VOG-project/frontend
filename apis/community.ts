import customAxios from "@/utils/customAxios";

interface PostData {
  title: string;
  content: string;
  postCategory?: string;
}

const createPostRequest = async (category: string, data: PostData) => {
  const { title, content, postCategory } = data;
  const res = await customAxios().post(`/posts/${category}`, {
    title,
    content,
    postCategory,
  });

  return res.data;
};

const getPostsRequest = async (category: string, page: number) => {
  const res = await customAxios().get("/posts", {
    params: {
      board: category,
      page,
    },
  });

  return res.data;
};

const getPostRequest = async (category: string, postId: number) => {
  const res = await customAxios().get(`/posts/${category}/${postId}`);

  return res.data;
};

const getPostCount = async (category: string) => {
  const res = await customAxios().get(`/posts/count`, {
    params: {
      board: category,
    },
  });

  return res.data;
};

const updatePostRequest = async (postId: number, data: PostData) => {
  const { title, content } = data;
  const res = await customAxios().patch(`/posts/${postId}`, {
    title,
    content,
  });

  return res.data;
};

const deletePostRequest = async (postId: number) => {
  const res = await customAxios().delete(`/posts/${postId}`, {});

  return res.data;
};

export {
  createPostRequest,
  getPostsRequest,
  getPostRequest,
  getPostCount,
  updatePostRequest,
  deletePostRequest,
};
