import { useRouter } from "next/router";
import Image from "next/image";
import tw from "twin.macro";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import { getIcons } from "@/components/icons";
import { leaveRoomEmit } from "@/utils/socketClient";
import { ChatMemberProps } from "@/types/chat";

const ChatMember = ({ members, roomId }: ChatMemberProps) => {
  const router = useRouter();

  return (
    <ChatMemberContainer>
      <Header title="Member" />
      <ChatMemberList>
        <MemberInfo>
          <MemberProfilePic
            src="/image/valorant_jett.jpg"
            alt="profile pic"
            width={1280}
            height={720}
          />
          <MemberNickname>Test</MemberNickname>
        </MemberInfo>
      </ChatMemberList>
      <ChatButtonContainer>
        <Button
          type="button"
          bgColor="secondary"
          onClick={() => {
            leaveRoomEmit(11, roomId);
            router.push("/");
          }}
        >
          <ExitIcon>{getIcons("exit", 32)}나가기</ExitIcon>
        </Button>
      </ChatButtonContainer>
    </ChatMemberContainer>
  );
};

export default ChatMember;

const ChatMemberContainer = tw.div`
  flex flex-col shrink-0 w-80 px-2 bg-zinc-900
`;

const ChatMemberList = tw.div`
  flex flex-col h-full
`;

const MemberInfo = tw.div`
  flex p-4
`;

const MemberProfilePic = tw(Image)`
  w-16 h-16 rounded-full
`;

const MemberNickname = tw.span`
  flex items-center h-16 ml-4
`;

const ExitIcon = tw.div`
  flex items-center justify-center
`;

const ChatButtonContainer = tw.div`
  justify-end w-full
`;
