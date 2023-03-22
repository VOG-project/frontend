import { ParsedUrlQuery } from "querystring";

export interface ChatQuery extends ParsedUrlQuery {
  id: string;
}

export interface ChatMemberProps {
  members: string | null;
  roomId: string;
}

export interface ChatRoom {
  createdAt: string;
  updatedAt: string;
  roomId: string;
  title: string;
  currentMember: number;
  maximumMember: number;
  no: number;
}

export interface RoomListProps {
  roomList: ChatRoom[];
}

export interface ChatProps {
  data: {
    success: boolean;
    result: ChatRoom[];
  };
}
