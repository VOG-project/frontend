import { useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import tw from "twin.macro";
import MainLayout from "@/components/layout/MainLayout";
import ChatMember from "./ChatMember";
import Header from "@/components/common/Header";
import { chatState } from "@/recoil/atoms/chatState";
import { ChatQuery } from "@/types/chat";
import { handleMessageSend, handleRoomLeave } from "@/utils/socketClient";

const ChatRoom = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { id: roomId } = router.query as ChatQuery;
  const [chat, setChat] = useRecoilState(chatState);

  return (
    <MainLayout>
      <ChatRoomContainer>
        <ChatMember />
        <ChatText>
          <Header title="#text" />
          <ChatLogs>
            <FlexBox />
            <ChatLog>
              <ChatMessage>
                <ChatProfile>123</ChatProfile>
              </ChatMessage>
            </ChatLog>
          </ChatLogs>
          <ChatForm>
            <ChatTextArea
              placeholder="메시지를 입력하세요"
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            ></ChatTextArea>
            <ChatBntContainer>
              <ChatSubmitBtn
                onClick={() => {
                  console.log(message);
                  handleMessageSend(message, chat.roomId, "test");
                }}
              >
                SEND
              </ChatSubmitBtn>
              <button
                style={{ height: "500px" }}
                onClick={() => {
                  handleRoomLeave(11, chat.roomId);
                }}
              >
                나가기
              </button>
            </ChatBntContainer>
          </ChatForm>
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

const ChatProfile = tw.div``;

const ChatMessage = tw.div``;

const FlexBox = tw.div`
  flex-1 w-full
`;

const ChatForm = tw.div`
  flex p-4 border-t border-neutral-700
`;

const ChatTextArea = tw.textarea`
  shrink grow p-4 w-full h-16 bg-transparent overflow-hidden resize-none
  focus:(outline-none placeholder-transparent)
`;

const ChatBntContainer = tw.div`
`;

const ChatSubmitBtn = tw.button`
  float-right w-20 h-16 bg-primary
`;
