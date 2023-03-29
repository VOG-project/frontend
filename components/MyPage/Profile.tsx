import Image from "next/image";
import tw from "twin.macro";
import { ProfileProps } from "@/types/myPage";

const Profile = ({ user }: ProfileProps) => {
  return (
    <ProfileContainer>
      <ProfilePic
        src={user.profileUrl}
        alt="profilePic"
        width={1280}
        height={800}
      />
      <ProfileInfo>
        <Email>{user.email}</Email>
        <Nickname>{user.nickname}</Nickname>
      </ProfileInfo>
    </ProfileContainer>
  );
};

export default Profile;

const ProfileContainer = tw.div`
  flex flex-col gap-4 items-center w-full
`;

const ProfilePic = tw(Image)`
  h-48 w-48 rounded-full
`;

const ProfileInfo = tw.div``;

const Email = tw.p`
`;

const Nickname = tw.p`
  text-2xl
`;
