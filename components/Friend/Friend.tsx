import { FormEvent, useEffect } from "react";
import tw, { styled } from "twin.macro";
import useToast from "@/hooks/useToast";
import useFriendState from "@/hooks/useFriendState";
import useUserProfileState from "@/hooks/useUserProfileState";
import useUserState from "@/hooks/useUserState";
import Header from "../common/Header";
import FriendContext from "./FriendContext";
import { getIcons } from "../icons";
import { searchFriendRequest } from "@/apis/friend";

const Friend = () => {
  const { toast } = useToast();
  const { friends, isShow, handleFriendToggle, updateFriendList } =
    useFriendState();
  const { handleUserProfileOpen } = useUserProfileState();
  const { userId } = useUserState();

  useEffect(() => {
    if (userId) updateFriendList(userId);
  }, []);

  const handleNicknameSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      nickname: { value: string };
    };
    const nickname = target.nickname.value;
    if (!nickname) return;

    const res = await searchFriendRequest(nickname);
    if (res.success) {
      res.result
        ? handleUserProfileOpen(res.result.id)
        : toast.alert("해당 닉네임을 가진 유저가 없습니다.");
    } else {
      toast.alert(res.error);
    }
    target.nickname.value = "";
  };

  return (
    <FriendContainer isShow={isShow}>
      <Header title="친구목록" />
      <FriendList>
        {friends.map((friend) => {
          return (
            <FriendProfile key={friend.following.id}>
              <FriendContext friend={friend} />
            </FriendProfile>
          );
        })}
      </FriendList>
      <FriendSearch onSubmit={handleNicknameSubmit}>
        <FriendSearchInput name="nickname" placeholder="닉네임을 입력하세요." />
        <FriendAddBtn type="submit">{getIcons("addFriend", 32)}</FriendAddBtn>
      </FriendSearch>
      <FriendToggle onClick={handleFriendToggle}>
        {getIcons("left", 20)}
      </FriendToggle>
    </FriendContainer>
  );
};

export default Friend;

const FriendContainer = styled.div<{ isShow: boolean }>(({ isShow }) => [
  tw`absolute flex flex-col w-60 h-full right-0 bg-black border-l border-neutral-700 transition-all z-50`,
  !isShow && tw`translate-x-full`,
]);

const FriendList = tw.ul`
  grow overflow-auto
`;

const FriendProfile = tw.li`
  relative
  hover:([& button]:block)
`;

const FriendAddBtn = tw.button`
  shrink-0 flex items-center justify-center w-full h-12 border border-primary
  hover:bg-white/30
`;
const FriendToggle = tw.button`
  absolute p-2 top-1/2 -left-8
`;

const FriendSearch = tw.form`
`;

const FriendSearchInput = tw.input`
  w-full h-12 px-4 bg-neutral-700 outline-none
`;
