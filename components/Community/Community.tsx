import tw from "twin.macro";
import MainLayout from "../layout/MainLayout";
import Header from "../common/Header";
import Search from "../common/Search";
import Navigation from "./Navigation";

const Community = () => {
  return (
    <MainLayout>
      <CommunityWrapper>
        <Navigation />
        <CommunityContainer>
          <Header singleMode={false} title="자유게시판">
            <Search />
          </Header>
        </CommunityContainer>
      </CommunityWrapper>
    </MainLayout>
  );
};

export default Community;

const CommunityWrapper = tw.article`
  w-full ml-64 py-4 px-10
`;

const CommunityContainer = tw.section`
  w-full p-4
`;
