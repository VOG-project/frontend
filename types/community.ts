import { ParsedUrlQuery } from "querystring";

type HandleCommentSubmit = (
  content: string | undefined,
  group: number | undefined,
  sequence: number
) => Promise<void>;

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
    postCount: number;
  };
}

export interface PostProps {
  content?: ContentDetail;
  comments: Comment[];
  likes: Number[];
  handleCommentSubmit: HandleCommentSubmit;
  handleLikeButtonClick: () => void;
  handleUserProfileOpen: (userId: number | null) => Promise<void>;
}

export interface CommentsProps {
  comments: Comment[];
  handleCommentSubmit: HandleCommentSubmit;
  handleUserProfileOpen: (userId: number | null) => Promise<void>;
}

export interface CommentProps {
  id: number;
  author: string;
  createdAt: string;
  content: string;
  group: number | undefined;
  reply: Comment[];
  handleCommentSubmit: HandleCommentSubmit;
  handleUserProfileOpen: (userId: number | null) => Promise<void>;
}

export interface CommentEditProps {
  isReply: boolean;
  group: number | undefined;
  sequence: number;
  handleCommentSubmit: HandleCommentSubmit;
}

export interface CommunityQuery extends ParsedUrlQuery {
  category: string;
  id: string;
}
