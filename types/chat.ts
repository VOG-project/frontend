import { ParsedUrlQuery } from "querystring";
import { SetterOrUpdater } from "recoil";

export interface ChatQuery extends ParsedUrlQuery {
  id: string;
}

interface ChatParticipant {
  userId: number;
  socketId: string;
  user: { nickname: string; profileUrl: string; sex: string };
}

export interface ChatState {
  chatParticipant: ChatParticipant[];
  messages: {
    content: string;
    nickname: string;
    roomId: string;
    isSender: boolean;
  }[];
  title: string;
  roomId: string;
  streams: { socketId: string; stream: MediaStream }[];
}

export interface ChatMemberProps {
  members: ChatParticipant[];
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
  chat: ChatState;
  setChat: SetterOrUpdater<ChatState>;
  socketConnect: () => void;
  handleChatRoomLeave: () => void;
}

export interface ChatEditValue {
  title: string;
  maximumMember: number;
}
