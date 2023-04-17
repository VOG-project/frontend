import { ParsedUrlQuery } from "querystring";
import { Dispatch, SetStateAction } from "react";

export type HandleUserProfileOpen = (userId: number | null) => Promise<void>;

export type HandleCommentSubmit = (
  content: string | undefined,
  commentId?: number
) => Promise<void>;

export type HandleDeleteCommentClick = (
  isReply: boolean,
  commentId: number
) => Promise<void>;

export type HandleEditCommentSubmit = (
  isReply: boolean,
  content: string | undefined,
  setIsEditing: Dispatch<SetStateAction<boolean>> | undefined,
  commentId?: number
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
  view: number;
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
  view: number;
}

export interface Comment {
  content: string;
  createdAt: string;
  id: number;
  updatedAt: string;
  user: {
    id: number;
    nickname: string;
    profileUrl: string;
    sex: string;
  };
  replies: Comment[];
}

export interface CommunityProps {
  data: {
    success: boolean;
    result: Content[];
    postCount: number;
  };
}

export interface PostProps {
  userId: number | null;
  content?: ContentDetail;
  comments: Comment[];
  likes: Number[];
  handleDeletePostClick: (postId: number) => Promise<void>;
  handleCommentSubmit: HandleCommentSubmit;
  handleDeleteCommentClick: HandleDeleteCommentClick;
  handleEditCommentSubmit: HandleEditCommentSubmit;
  handleLikeButtonClick: () => void;
  handleUserProfileOpen: HandleUserProfileOpen;
}

export interface CommentsProps {
  userId: number | null;
  comments: Comment[];
  handleCommentSubmit: HandleCommentSubmit;
  handleDeleteCommentClick: HandleDeleteCommentClick;
  handleEditCommentSubmit: HandleEditCommentSubmit;
  handleUserProfileOpen: HandleUserProfileOpen;
}

export interface CommentProps {
  comment: Comment;
  userId: number | null;
  handleCommentSubmit: HandleCommentSubmit;
  handleDeleteCommentClick: HandleDeleteCommentClick;
  handleEditCommentSubmit: HandleEditCommentSubmit;
  handleUserProfileOpen: HandleUserProfileOpen;
}

export interface CommentEditProps {
  setReply: boolean;
  isReply: boolean;
  value?: string;
  commentId?: number;
  setIsEditing?: Dispatch<SetStateAction<boolean>>;
  handleCommentSubmit: HandleCommentSubmit;
  handleEditCommentSubmit?: HandleEditCommentSubmit;
}

export interface CommunityQuery extends ParsedUrlQuery {
  category: string;
  id: string;
  editMode?: string;
  type?: string;
  keyword?: string;
}
