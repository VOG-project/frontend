import customAxios from "@/utils/customAxios";

interface PostData {
  title: string;
  content: string;
  gameCategory?: string;
}

const createPostRequest = async (category: string, data: PostData) => {
  const { title, content, gameCategory } = data;
  const res = await customAxios().post(`/posts/${category}`, {
    title,
    content,
    gameCategory,
  });

  return res.data;
};

const getPostsRequest = async (category: string, page: number) => {
  const res = await customAxios().get(`/posts/${category}`, {
    params: {
      page,
    },
  });

  return res.data;
};

const updatePostRequest = async (postId: number, data: PostData) => {};

const deletePostRequest = async (postId: number) => {};

export {
  createPostRequest,
  getPostsRequest,
  updatePostRequest,
  deletePostRequest,
};
