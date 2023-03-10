import tw from "twin.macro";
import MainLayout from "../layout/MainLayout";
import Header from "../common/Header";
import MyPageCard from "./MyPageCard";

const MyPage = () => {
  return (
    <MainLayout>
      <MyPageWrapper>
        <Header title="마이페이지" />
        <MyPageContainer>
          <MyPageCard />
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
  flex items-center justify-center w-full h-[calc(100% - 4rem)]
`;
