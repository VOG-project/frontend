import { useRouter } from "next/router";
import tw from "twin.macro";
import useToast from "@/hooks/useToast";
import useUserState from "@/hooks/useUserState";
import useFriendState from "@/hooks/useFriendState";
import useModal from "@/hooks/useModal";
import MainLayout from "../layout/MainLayout";
import Header from "../common/Header";
import Profile from "./Profile";
import Modal from "../common/Modal";
import ProfilePicEdit from "./MyPageCards/ProfilePicEdit";
import NicknameEdit from "./MyPageCards/NicknameEdit";
import DeleteAccount from "./MyPageCards/DeleteAccount";
import {
  uploadProfilePicRequest,
  changeNicknameRequest,
  withdrawalRequest,
} from "@/apis/user";
import { NicknameEditValue, ProfilePicEditValue } from "@/types/myPage";
import { deleteAccessToken } from "@/utils/tokenManager";
import imageResize from "@/utils/imageResize";

const MyPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user, userId, resetUser, setUser } = useUserState();
  const { resetFriend } = useFriendState();
  const { isOpen, handleModalClose, handleModalOpen } = useModal();

  const handleProfilePicUpload = async (data: ProfilePicEditValue) => {
    if (!userId) return;

    const { profilePic } = data;
    const image = profilePic.item(0);
    image &&
      (await imageResize(image)
        .then(async (image) => {
          const res = image && (await uploadProfilePicRequest(userId, image));
          if (res.success) {
            const uploadedProfileUrl = res.result.profileUrl;
            setUser((prev) => {
              return { ...prev, profileUrl: uploadedProfileUrl };
            });
            toast.success("프로필이미지가 변경되었습니다.");
          } else {
            toast.alert(res.error);
          }
        })
        .catch((error) => {
          console.error(error);
          toast.alert("이미지 압축에 실패하였습니다.");
        }));
  };

  const handleNicknameChangeSubmit = async (data: NicknameEditValue) => {
    if (!userId) return;

    const { nickname } = data;
    const res = await changeNicknameRequest(userId, nickname);
    if (res.success) {
      const changedNickname = res.result.nickname;
      setUser((prev) => {
        return { ...prev, nickname: changedNickname };
      });
      toast.success("닉네임이 변경되었습니다.");
    } else {
      toast.alert(res.error);
    }
  };

  const handleDeleteAccount = async () => {
    if (!userId) return;

    const res = await withdrawalRequest(userId);
    if (res.success) {
      resetUser();
      resetFriend();
      deleteAccessToken();
      router.replace("/");
    } else {
      toast.alert(res.error);
    }
  };

  return (
    <MainLayout>
      <MyPageWrapper>
        <Header title="마이페이지" />
        <MyPageContainer>
          <Profile user={user} />
          <ProfilePicEdit handleProfilePicUpload={handleProfilePicUpload} />
          <NicknameEdit handleNicknameEditSubmit={handleNicknameChangeSubmit} />
          <DeleteAccount handleModalOpen={handleModalOpen} />
        </MyPageContainer>
      </MyPageWrapper>
      <Modal
        isOpen={isOpen}
        title="회원탈퇴"
        content="정말로 탈퇴하시겠습까?"
        handleClose={handleModalClose}
        handleConfirm={handleDeleteAccount}
      ></Modal>
    </MainLayout>
  );
};

export default MyPage;

const MyPageWrapper = tw.article`
  w-full ml-64 py-4 px-4
`;

const MyPageContainer = tw.div`
  flex flex-col items-center gap-4 w-full h-[calc(100% - 4rem)] m-auto py-16 px-64 overflow-auto
`;
