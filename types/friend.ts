export const INITIAL_STATE: {
  isShow: boolean;
  x: number;
  y: number;
  reverse: boolean;
} = { isShow: false, x: 0, y: 0, reverse: false };

export interface Friend {
  userId: number;
  following: {
    createdAt: string;
    email: string;
    id: number;
    nickname: string;
    profileUrl: string;
    sex: "남" | "여";
    updatedAt: string;
  };
}

export interface FriendState {
  isShow: boolean;
  friends: Friend[];
}

export interface FriendContextProps {
  friend: Friend;
}
