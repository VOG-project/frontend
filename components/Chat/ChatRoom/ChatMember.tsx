import Image from "next/image";
import tw from "twin.macro";
import Header from "@/components/common/Header";

const ChatMember = () => {
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
    </ChatMemberContainer>
  );
};

export default ChatMember;

const ChatMemberContainer = tw.div`
  shrink-0 w-72 bg-zinc-900 rounded-l
`;

const ChatMemberList = tw.div`
  flex flex-col
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
