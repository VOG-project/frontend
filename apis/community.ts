import customAxios from "@/utils/customAxios";

interface PostData {
  writerId: number;
  title: string;
  content: string;
  gameCategory?: string;
}

const createPostRequest = async (category: string, data: PostData) => {
  const { writerId, title, content, gameCategory } = data;
  const res = await customAxios().post(`/posts/${category}`, {
    writerId,
    title,
    content,
    gameCategory,
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

const updatePostRequest = async (postId: number, data: PostData) => {};

const deletePostRequest = async (postId: number) => {};

export {
  createPostRequest,
  getPostsRequest,
  getPostRequest,
  getPostCount,
  updatePostRequest,
  deletePostRequest,
};
