import Image from "next/image";
import tw, { styled } from "twin.macro";

const ChatMessage = ({ isSender }) => {
  return (
    <ChatMessageContainer isSender={true}>
      <ChatProfilePic>
        <ProfilePic
          src="/image/valorant_jett.jpg"
          alt="profilePic"
          width={64}
          height={64}
        />
      </ChatProfilePic>
      <ChatContent>
        <Nickname>test</Nickname>
        <Content>안녕하세요</Content>
      </ChatContent>
    </ChatMessageContainer>
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
