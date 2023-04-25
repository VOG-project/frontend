import { useState, useRef, KeyboardEvent, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useChatState from "@/hooks/useChatState";
import useUser from "@/hooks/useUserState";
import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/common/Header";
import ChatMember from "./ChatMember";
import ChatMessage from "./ChatMessage";
import { sendMessageEmit, leaveRoomEmit } from "@/utils/socketClient";

const ChatRoom = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { user, userId } = useUser();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const {
    setChat,
    chat: { chatParticipant, roomId, title, messages },
    resetChat,
  } = useChatState();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [messages]);

  const handleTextAreaKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!e.shiftKey && e.key === "Enter") {
      e.preventDefault();
      buttonRef.current?.click();
    }
    return;
  };

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.target.style.height = "auto";
    const scrollHeight = e.target.scrollHeight;
    const message = e.target.value.trim();
    if (message) {
      setMessage(message);
    }
    e.target.style.height = scrollHeight + "px";
  };

  const handleMessageSend = () => {
    if (!message) return;
    setChat((prev) => {
      return {
        ...prev,
        messages: [
          ...prev.messages,
          {
            content: message,
            roomId: roomId,
            profileUrl: user.profileUrl,
            nickname: user.nickname,
            isSender: true,
          },
        ],
      };
    });
    sendMessageEmit(message, roomId, user.nickname);
    if (textareaRef.current) {
      textareaRef.current.value = "";
    }
    setMessage("");
  };

  const handleChatRoomLeave = () => {
    if (!userId) return;
    leaveRoomEmit(userId, roomId);
    resetChat();
    router.push("/chat");
  };

  return (
    <MainLayout>
      <ChatRoomContainer>
        <ChatMember
          members={chatParticipant}
          handleChatRoomLeave={handleChatRoomLeave}
        />
        <ChatText>
          <Header title={title} />
          <ChatLogs>
            <FlexBox />
            <ChatLog ref={scrollRef}>
              <ChatMessage messages={messages} />
            </ChatLog>
          </ChatLogs>
          <ChatTextAreaContainer>
            <ChatTextArea
              placeholder="메시지를 입력하세요"
              onChange={handleTextAreaChange}
              onKeyDown={handleTextAreaKeyDown}
              rows={1}
              ref={textareaRef}
            ></ChatTextArea>
            <ChatBntContainer>
              <ChatSubmitBtn
                type="button"
                ref={buttonRef}
                onClick={handleMessageSend}
              >
                SEND
              </ChatSubmitBtn>
            </ChatBntContainer>
          </ChatTextAreaContainer>
        </ChatText>
      </ChatRoomContainer>
    </MainLayout>
  );
};

export default ChatRoom;

const ChatRoomContainer = tw.article`
  flex w-full ml-64 p-4 gap-2
`;

const ChatText = tw.div`
  flex flex-col w-full h-full px-2 bg-white/5
`;

const ChatLogs = tw.div`
  flex flex-col shrink w-full h-full overflow-y-auto
`;

const ChatLog = tw.div`
  w-full p-8
`;

const FlexBox = tw.div`
  flex-1 w-full
`;

const ChatTextAreaContainer = tw.div`
  flex p-4 border-t border-neutral-700
`;

const ChatTextArea = tw.textarea`
  shrink grow p-4 w-full max-h-96 rounded-l-lg bg-stone-800 resize-none 
  focus:(outline-none placeholder-transparent)
`;

const ChatBntContainer = tw.div`
`;

const ChatSubmitBtn = tw.button`
  float-right w-20 h-full rounded-r-lg bg-primary
`;
