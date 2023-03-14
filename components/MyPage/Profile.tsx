import Image from "next/image";
import tw from "twin.macro";

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfilePic
        src="/image/valorant_jett.jpg"
        alt="profile"
        width={1280}
        height={800}
      />
      <ProfileInfo>
        <Email>test@test.com</Email>
        <Nickname>test</Nickname>
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
