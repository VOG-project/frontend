import { io } from "socket.io-client";

export const socketClient = io(`${process.env.NEXT_PUBLIC_SOCKET}/chat`, {
  transports: ["websocket"],
  autoConnect: false,
});

export const handleMessageSend = (
  content: string,
  roomId: string,
  nickname: string
) => {
  socketClient.emit("inputChat", {
    content,
    roomId,
    nickname,
  });
};

export const handleRoomLeave = (userId: number, roomId: string) => {
  socketClient.emit("leaveChatRoom", {
    userId,
    roomId,
  });
};
