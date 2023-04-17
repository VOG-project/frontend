import { MouseEvent, useState } from "react";
import tw, { styled, css } from "twin.macro";
import useFriendState from "@/hooks/useFriendState";
import useUserProfileState from "@/hooks/useUserProfileState";
import UserCard from "../common/UserCard";
import { CONTEXT_MENU_WIDTH } from "@/constants/friend";
import { INITIAL_STATE, FriendContextProps } from "@/types/friend";

const FriendContext = ({ friend }: FriendContextProps) => {
  const { handleRemoveFriendClick } = useFriendState();
  const { handleUserProfileOpen } = useUserProfileState();
  const [contextMenuState, setContextMenuState] = useState(INITIAL_STATE);

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

  const resetContextMenuState = () => {
    setContextMenuState(INITIAL_STATE);
  };

  return (
    <ContextWrapper onContextMenu={(e) => handleRightClick(e)}>
      {contextMenuState.isShow && (
        <ContextMenus
          x={contextMenuState.x}
          y={contextMenuState.y}
          reverse={contextMenuState.reverse}
        >
          <ContextMenu
            onClick={async () => {
              await handleUserProfileOpen(friend.following.id);
              resetContextMenuState();
            }}
          >
            프로필
          </ContextMenu>
          {/* <ContextMenu>채팅방 초대</ContextMenu> */}
          <ContextMenu
            onClick={async () => {
              await handleRemoveFriendClick(friend.userId, friend.following.id);
              resetContextMenuState();
            }}
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
  );
};

export default FriendContext;

const ContextWrapper = tw.div``;

const ContextMenus = styled.ul<{ x: number; y: number; reverse: boolean }>(
  ({ x, y, reverse }) => [
    tw`fixed w-24 divide-y bg-white text-black z-50`,
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
