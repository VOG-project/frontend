import { ParsedUrlQuery } from "querystring";

export interface Content {
  createdAt: string;
  id: number;
  writerId: number;
  title: string;
  likeCount: number;
  gameCategory: string;
  user: {
    id: number;
    nickname: string;
  };
}

export interface ContentDetail {
  content: string;
  createdAt: string;
  id: number;
  likeCount: number;
  postCategory: string;
  title: string;
  updatedAt: string;
  comments: Comment[];
  user: {
    id: number;
    nickname: string;
  };
}

export interface Comment {
  content: string;
  createdAt: string;
  group: number;
  id: number;
  sequence: number;
  updatedAt: string;
  userId: number;
  user: {
    id: number;
    nickname: string;
  };
  reply: Comment[];
}

export interface CommunityProps {
  data: {
    success: boolean;
    result: Content[];
  };
  postCount: number;
}

export interface PostProps {
  content?: ContentDetail;
}

export interface CommentsProps {
  comments: Comment[];
}

export interface CommentProps {
  author: string;
  createdAt: string;
  content: string;
  reply: Comment[];
}

export interface CommunityQuery extends ParsedUrlQuery {
  category: string;
  id: string;
}
