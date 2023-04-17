import customAxios from "@/utils/customAxios";
import { CookieValueTypes } from "cookies-next";

interface PostData {
  writerId: number;
  title: string;
  content: string;
  postCategory?: string;
}

const createPostRequest = async (data: PostData) => {
  const { writerId, title, content, postCategory } = data;
  const res = await customAxios.post(`/posts`, {
    writerId,
    title,
    content,
    postCategory,
  });

  return res.data;
};

const editPostRequest = async (
  postId: number,
  title: string,
  content: string
) => {
  const res = await customAxios.patch(`/posts/${postId}`, {
    title: title,
    content: content,
  });

  return res.data;
};

const getPostsRequest = async (
  category: string,
  page: number,
  accessToken?: CookieValueTypes
) => {
  const res = await customAxios.get("/posts", {
    headers: accessToken
      ? {
          Authorization: `bearer ${accessToken}`,
        }
      : undefined,
    params: {
      board: category,
      page,
    },
  });

  return res.data;
};

const getPostRequest = async (postId: number) => {
  const res = await customAxios.get(`/posts/${postId}`);

  return res.data;
};

const updatePostRequest = async (postId: number, data: PostData) => {
  const { title, content } = data;
  const res = await customAxios.patch(`/posts/${postId}`, {
    title,
    content,
  });

  return res.data;
};

const deletePostRequest = async (postId: number) => {
  const res = await customAxios.delete(`/posts/${postId}`);

  return res.data;
};

const searchPostRequest = async (
  board: string,
  searchType: string,
  keyword: string,
  page: number
) => {
  const res = await customAxios.get("/posts/search", {
    params: {
      board: board,
      searchType: searchType,
      keyword: keyword,
      page: page,
    },
  });

  return res.data;
};

export {
  createPostRequest,
  editPostRequest,
  getPostsRequest,
  getPostRequest,
  updatePostRequest,
  deletePostRequest,
  searchPostRequest,
};
