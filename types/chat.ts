import { MutableRefObject } from "react";
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
  isVolumeMuted: boolean;
  isMicMuted: boolean;
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
  chat: ChatState;
  peerConnectionsRef: MutableRefObject<{
    [key: string]: RTCPeerConnection;
  }>;
  setChat: SetterOrUpdater<ChatState>;
  socketConnect: () => void;
  handleChatRoomLeave: () => void;
  handleTitleClick: () => void;
  handleUserProfileOpen: (userId: number | null) => Promise<void>;
  handleModalOpen: () => void;
}

export interface ChatEditValue {
  title: string;
  maximumMember: number;
}
