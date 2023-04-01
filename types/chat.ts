import { ParsedUrlQuery } from "querystring";
import { SetterOrUpdater } from "recoil";

export interface ChatQuery extends ParsedUrlQuery {
  id: string;
}

export interface ChatState {
  chatParticipant: { userId: number; socketId: string; nickname: string }[];
  messages: {
    content: string;
    nickname: string;
    roomId: string;
    isSender: boolean;
  }[];
  title: string;
  roomId: string;
}

export interface ChatMemberProps {
  members: { userId: number; socketId: string; nickname: string }[];
  handleChatRoomLeave: () => void;
}

export interface ChatEditProps {
  isOpen: boolean;
  handleModalClose: () => void;
  handleChatRoomCreate: (data: ChatEditValue) => Promise<void>;
}

export interface ChatMessageProps {
  messages: {
    content: string;
    nickname: string;
    roomId: string;
    isSender: boolean;
  }[];
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
  handleRoomClick: (roomId: string) => void;
}

export interface ChatProps {
  data: {
    success: boolean;
    result: ChatRoom[];
    chatRoomCount: number;
  };
}

export interface ChatSocketProps {
  isChatRoom: boolean;
  roomId: string;
  setChat: SetterOrUpdater<ChatState>;
  socketConnect: () => void;
  handleChatRoomLeave: () => void;
}

export interface ChatEditValue {
  title: string;
  maximumMember: number;
}
