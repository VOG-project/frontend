import tw, { styled } from "twin.macro";
import useFriendState from "@/hooks/useFriendState";
import Header from "../common/Header";
import UserCard from "../common/UserCard";
import { deleteFriendRequest } from "@/apis/friend";
import { getIcons } from "../icons";

const Friend = () => {
  const { friends, isShow, handleFriendToggle } = useFriendState();
  const handleRemoveFriendClick = async (userId: number, targetId: number) => {
    const res = await deleteFriendRequest(userId, targetId);

    if (res.success) {
      console.log("성공!");
    }
  };

  return (
    <FriendContainer isShow={isShow}>
      <Header title="친구목록" />
      <FriendList>
        {friends.map((friend) => {
          return (
            <FriendProfile key={friend.userId}>
              <UserCard
                nickname={friend.following.nickname}
                profilePic={friend.following.profileUrl}
              />
              <RemoveFriendBtn
                onClick={() =>
                  handleRemoveFriendClick(friend.userId, friend.following.id)
                }
              >
                {getIcons("removeFriend", 32)}
              </RemoveFriendBtn>
            </FriendProfile>
          );
        })}
      </FriendList>
      <FriendAddBtn>{getIcons("addFriend", 32)}</FriendAddBtn>
      <FriendToggle onClick={handleFriendToggle}>{"<"}</FriendToggle>
    </FriendContainer>
  );
};

export default Friend;

const FriendContainer = styled.div<{ isShow: boolean }>(({ isShow }) => [
  tw`absolute flex flex-col w-60 h-full right-0 bg-black border-l border-neutral-700 transition-all`,
  !isShow && tw`translate-x-full`,
]);

const FriendList = tw.ul`
  grow overflow-auto
`;

const FriendProfile = tw.li`
  relative
  hover:([& button]:block)
`;

const RemoveFriendBtn = tw.button`
  absolute hidden top-3 right-6 w-10 h-10 text-center text-secondary rounded
  hover:(bg-white/20)
  [& svg]:(inline-block align-middle)
`;

const FriendAddBtn = tw.button`
  shrink-0 flex items-center justify-center w-full h-12 border border-primary
  hover:bg-white/30
`;
const FriendToggle = tw.button`
  absolute p-2 top-1/2 -left-8
`;
