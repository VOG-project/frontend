import tw from "twin.macro";
import MainLayout from "../layout/MainLayout";
import Header from "../common/Header";
import Profile from "./Profile";
import ProfilePicEdit from "./MyPageCards/ProfilePicEdit";
import NicknameEdit from "./MyPageCards/NicknameEdit";
import PasswordEdit from "./MyPageCards/PasswordEdit";
import DeleteAccount from "./MyPageCards/DeleteAccount";

const MyPage = () => {
  return (
    <MainLayout>
      <MyPageWrapper>
        <Header title="마이페이지" />
        <MyPageContainer>
          <Profile />
          <ProfilePicEdit />
          <NicknameEdit />
          <PasswordEdit />
          <DeleteAccount />
        </MyPageContainer>
      </MyPageWrapper>
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
