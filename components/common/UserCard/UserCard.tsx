import tw from "twin.macro";

const UserCard = () => {
  return (
    <UserCardContainer>
      <UserProfile />
      <UserName>Test</UserName>
    </UserCardContainer>
  );
};

export default UserCard;

const UserCardContainer = tw.div`
  flex items-center h-16 p-2
`;

const UserProfile = tw.img`
  w-10 h-10 rounded-full bg-white
`;

const UserName = tw.div`
flex-1 h-10 px-4
`;
