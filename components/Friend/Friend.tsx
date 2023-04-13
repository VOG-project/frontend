import { MouseEvent, useState } from "react";
import tw, { styled, css } from "twin.macro";
import useFriendState from "@/hooks/useFriendState";
import useUserProfileState from "@/hooks/useUserProfileState";
import Header from "../common/Header";
import UserCard from "../common/UserCard";
import { getIcons } from "../icons";
import { CONTEXT_MENU_WIDTH } from "@/constants/friend";

const Friend = () => {
  const { friends, isShow, handleFriendToggle, handleRemoveFriendClick } =
    useFriendState();
  const { handleUserProfileOpen } = useUserProfileState();
  const [contextMenuState, setContextMenuState] = useState({
    isShow: false,
    x: 0,
    y: 0,
    reverse: false,
  });

  const handleRightClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    const maxWidth = window.innerWidth;
    if (e.pageX + CONTEXT_MENU_WIDTH > maxWidth) {
      setContextMenuState((prev) => {
        return {
          isShow: !prev.isShow,
          x: maxWidth - e.pageX,
          y: e.pageY,
          reverse: true,
        };
      });
    } else {
      setContextMenuState((prev) => {
        return {
          isShow: !prev.isShow,
          x: e.pageX,
          y: e.pageY,
          reverse: false,
        };
      });
    }
  };

  console.log(contextMenuState);

  return (
    <FriendContainer isShow={isShow}>
      <Header title="친구목록" />
      <FriendList>
        {friends.map((friend) => {
          return (
            <FriendProfile key={friend.following.id}>
              <ContextWrapper onClick={(e) => handleRightClick(e)}>
                {contextMenuState.isShow && (
                  <ContextMenus
                    x={contextMenuState.x}
                    y={contextMenuState.y}
                    reverse={contextMenuState.reverse}
                  >
                    <ContextMenu
                      onClick={() => handleUserProfileOpen(friend.userId)}
                    >
                      프로필
                    </ContextMenu>
                    <ContextMenu>채팅방 초대</ContextMenu>
                    <ContextMenu
                      onClick={() =>
                        handleRemoveFriendClick(
                          friend.userId,
                          friend.following.id
                        )
                      }
                    >
                      친구 삭제
                    </ContextMenu>
                  </ContextMenus>
                )}
                <UserCard
                  nickname={friend.following.nickname}
                  profilePic={friend.following.profileUrl}
                />
              </ContextWrapper>
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

const ContextWrapper = tw.div``;

const ContextMenus = styled.ul<{ x: number; y: number; reverse: boolean }>(
  ({ x, y, reverse }) => [
    tw`fixed w-24 divide-y bg-white text-black `,
    reverse
      ? css`
          top: ${y}px;
          right: ${x}px;
        `
      : css`
          top: ${y}px;
          left: ${x}px;
        `,
  ]
);

const ContextMenu = tw.li`
  p-2 cursor-pointer
  hover:(bg-primary text-white)
`;
