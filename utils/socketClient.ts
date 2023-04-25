import { io } from "socket.io-client";

export const socketClient = io(`${process.env.NEXT_PUBLIC_SOCKET}/chat`, {
  transports: ["websocket"],
  autoConnect: false,
  closeOnBeforeunload: false,
});

export const sendMessageEmit = (
  content: string,
  roomId: string,
  nickname: string,
  profileUrl: string
) => {
  socketClient.emit("inputChat", {
    content,
    roomId,
    nickname,
    profileUrl,
  });
};

export const leaveRoomEmit = (userId: number, roomId: string) => {
  socketClient.emit("leaveChatRoom", {
    userId,
    roomId,
  });
};

export const enterRoomEmit = (userId: number, roomId: string) => {
  socketClient.emit("enterChatRoom", {
    userId,
    roomId,
  });
};
