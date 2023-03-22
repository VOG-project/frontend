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

export interface CommunityProps {
  data: {
    success: boolean;
    result: Content[];
  };
}

export interface CommunityQuery extends ParsedUrlQuery {
  category: string;
  id: string;
}

export interface ContentDetail {
  content: string;
  gameCategory: string;
  id: number;
  likeCount: number;
  title: string;
  updatedAt: string;
  user: {
    updatedAt: string;
    id: number;
    email: string;
    nickname: string;
    sex: number;
    wirterId: number;
  };
}

export interface PostProps {
  content?: ContentDetail;
}
