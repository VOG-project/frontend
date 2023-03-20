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
}
