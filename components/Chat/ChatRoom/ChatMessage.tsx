import Image from "next/image";
import tw, { styled } from "twin.macro";
import { ChatMessageProps } from "@/types/chat";

const ChatMessage = ({ messages }: ChatMessageProps) => {
  return (
    <>
      {messages.map((message, index) => {
        return (
          <ChatMessageContainer key={index} isSender={message.isSender}>
            <ChatProfilePic>
              <ProfilePic
                src={message.profileUrl || "/image/blank_profile.png"}
                alt="profilePic"
                width={64}
                height={64}
              />
            </ChatProfilePic>
            <ChatContent>
              <Nickname>{message.nickname}</Nickname>
              <Content>{message.content}</Content>
            </ChatContent>
          </ChatMessageContainer>
        );
      })}
    </>
  );
};

export default ChatMessage;

const ChatMessageContainer = styled.div<{ isSender: boolean }>(
  ({ isSender }) => [
    tw`flex gap-4`,
    isSender && tw`flex-row-reverse [& div]:text-right`,
  ]
);

const ChatProfilePic = tw.div`
  shrink-0
`;

const ProfilePic = tw(Image)`
  w-20 h-20 rounded-full
`;

const ChatContent = tw.div``;

const Nickname = tw.div`
  m-2
`;

const Content = tw.p`
  w-auto p-4 border border-primary rounded-lg bg-zinc-800 break-all whitespace-pre-wrap
`;
