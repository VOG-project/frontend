import { useState, ChangeEvent } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useToast from "@/hooks/useToast";
import useUserState from "@/hooks/useUserState";
import useModal from "@/hooks/useModal";
import MainLayout from "../layout/MainLayout";
import Header from "../common/Header";
import Profile from "./Profile";
import Modal from "../common/Modal";
import Input from "../common/Input";
import ProfilePicEdit from "./MyPageCards/ProfilePicEdit";
import NicknameEdit from "./MyPageCards/NicknameEdit";
import PasswordEdit from "./MyPageCards/PasswordEdit";
import DeleteAccount from "./MyPageCards/DeleteAccount";
import {
  uploadProfilePicRequest,
  changeNicknameRequest,
  changePasswordRequest,
  withdrawalRequest,
} from "@/apis/user";
import {
  PasswordEditValue,
  NicknameEditValue,
  ProfilePicEditValue,
} from "@/types/myPage";
import imageResize from "@/utils/imageResize";

const MyPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  const { user, userId, resetUser } = useUserState();
  const { isOpen, handleModalClose, handleModalOpen } = useModal();

  const handleProfilePicUpload = async (data: ProfilePicEditValue) => {
    if (!userId) return;

    const { profilePic } = data;
    const image = profilePic.item(0);
    image &&
      (await imageResize(image)
        .then(async (image) => {
          const res = image && (await uploadProfilePicRequest(userId, image));
          console.log(res);
        })
        .catch((error) => {
          console.error(error);
          toast.alert("이미지 압축에 실패하였습니다.");
        }));
    // const res = image && (await uploadProfilePicRequest(userId, image));
    // console.log(res);
  };

  const handleNicknameChangeSubmit = async (data: NicknameEditValue) => {
    if (!userId) return;

    const { nickname } = data;
    const res = await changeNicknameRequest(userId, nickname);

    console.log(res);
  };

  const handlePasswordChangeSubmit = async (data: PasswordEditValue) => {
    if (!userId) return;

    const { currentPassword, password } = data;
    const res = await changePasswordRequest(userId, currentPassword, password);
    if (res.success) {
      resetUser();
      router.replace("/");
    } else {
      toast.alert(res.error);
    }
  };

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleDeleteAccount = async () => {
    if (!userId) return;
    if (!password) {
      toast.alert("비밀번호를 입력하세요.");
      return;
    }

    const res = await withdrawalRequest(userId, password);
    if (res.success) {
      resetUser();
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
          <PasswordEdit handlePasswordEditSubmit={handlePasswordChangeSubmit} />
          <DeleteAccount handleModalOpen={handleModalOpen} />
        </MyPageContainer>
      </MyPageWrapper>
      <Modal
        isOpen={isOpen}
        title="회원탈퇴"
        content="정말로 탈퇴하시겠습까?"
        handleClose={handleModalClose}
        handleConfirm={handleDeleteAccount}
      >
        <Input
          type="password"
          bgColor="gray"
          placeholder="비밀번호를 입력하세요."
          onChange={handlePasswordInputChange}
        ></Input>
      </Modal>
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
