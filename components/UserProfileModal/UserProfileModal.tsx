import Image from "next/image";
import tw from "twin.macro";
import useUserProfileState from "@/hooks/useUserProfileState";
import useFriendState from "@/hooks/useFriendState";
import useUserState from "@/hooks/useUserState";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { getIcons } from "../icons";

const UserProfileModal = () => {
  const { isOpen, userProfile, handleUserProfileClose } = useUserProfileState();
  const { friendIds, handleAddFriendClick, handleRemoveFriendClick } =
    useFriendState();
  const { userId } = useUserState();

  return (
    <Modal
      isOpen={isOpen}
      title="Profile"
      hasFooter={false}
      handleClose={handleUserProfileClose}
    >
      <UserProfile>
        <UserProfilePic
          src={userProfile.profileUrl}
          width={128}
          height={128}
          alt="userProfilePic"
        />
        <UserNickname>{userProfile.nickname}</UserNickname>
        {friendIds.includes(userProfile.id!) ? (
          <Button
            bgColor="secondary"
            onClick={() => handleRemoveFriendClick(userId, userProfile.id)}
          >
            <ButtonIcon>{getIcons("removeFriend", 32)}친구삭제</ButtonIcon>
          </Button>
        ) : (
          <Button
            bgColor="primary"
            onClick={() => handleAddFriendClick(userId, userProfile.id)}
          >
            <ButtonIcon>{getIcons("addFriend", 32)}친구추가</ButtonIcon>
          </Button>
        )}
      </UserProfile>
    </Modal>
  );
};

export default UserProfileModal;

const UserProfile = tw.div`
  flex flex-col items-center justify-center
`;

const UserProfilePic = tw(Image)`
  h-32 w-32 rounded-full
`;

const UserNickname = tw.span`
  text-2xl
`;

const ButtonIcon = tw.div`
  flex items-center justify-center
`;
