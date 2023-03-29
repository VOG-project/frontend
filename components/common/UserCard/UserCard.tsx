import tw from "twin.macro";

interface UserCardProps {
  nickname: string;
  profilePic: string;
}

const UserCard = ({ nickname, profilePic }: UserCardProps) => {
  return (
    <UserCardContainer>
      <UserProfile src={profilePic} />
      <UserName>{nickname}</UserName>
    </UserCardContainer>
  );
};

export default UserCard;

const UserCardContainer = tw.div`
  flex items-center h-16 p-2
`;

const UserProfile = tw.img`
  w-12 h-12 rounded-full bg-white
`;

const UserName = tw.div`
  flex-1 flex items-center h-10 px-4
`;
