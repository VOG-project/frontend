import { useState, useRef } from "react";
import tw from "twin.macro";
import useChatState from "@/hooks/useChatState";
import MainLayout from "@/components/layout/MainLayout";
import Header from "@/components/common/Header";
import ChatMember from "./ChatMember";
import ChatMessage from "./ChatMessage";
import { sendMessageEmit } from "@/utils/socketClient";

const ChatRoom = () => {
  const [message, setMessage] = useState("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { chat } = useChatState();
  const { members, roomId } = chat;

  return (
    <MainLayout>
      <ChatRoomContainer>
        <ChatMember members={members} roomId={roomId} />
        <ChatText>
          <Header title="#text" />
          <ChatLogs>
            <FlexBox />
            <ChatLog>
              <ChatMessage />
            </ChatLog>
          </ChatLogs>
          <ChatTextAreaContainer>
            <ChatTextArea
              placeholder="메시지를 입력하세요"
              onChange={(e) => {
                e.target.style.height = "auto";
                const message = e.target.value.trim();
                if (message) {
                  setMessage(message);
                }
                const scrollHeight = e.target.scrollHeight;
                e.target.style.height = scrollHeight + "px";
              }}
              onKeyDown={(e) => {
                if (!e.shiftKey && e.key === "Enter") {
                  e.preventDefault();
                  buttonRef.current?.click();
                }
              }}
              rows={1}
            ></ChatTextArea>
            <ChatBntContainer>
              <ChatSubmitBtn
                type="button"
                ref={buttonRef}
                onClick={() => {
                  sendMessageEmit(message, chat.roomId, "test");
                }}
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
  flex w-full ml-64 p-4
`;

const ChatText = tw.div`
  flex flex-col w-full h-full rounded-r 
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
  shrink grow p-4 w-full bg-transparent overflow-hidden resize-none bg-gray-800
  focus:(outline-none placeholder-transparent)
`;

const ChatBntContainer = tw.div`
`;

const ChatSubmitBtn = tw.button`
  float-right w-20 h-full bg-primary
`;
