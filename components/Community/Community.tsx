import tw from "twin.macro";
import MainLayout from "../layout/MainLayout";
import Header from "../common/Header";
import Search from "../common/Search";
import Navigation from "./Navigation";
import Contents from "./Contents";

const Community = () => {
  return (
    <MainLayout>
      <CommunityWrapper>
        <Navigation />
        <CommunityContainer>
          <Header title="자유게시판">
            <Search />
          </Header>
          <Contents />
        </CommunityContainer>
      </CommunityWrapper>
    </MainLayout>
  );
};

export default Community;

const CommunityWrapper = tw.article`
  w-full ml-64 py-4 px-4
`;

const CommunityContainer = tw.section`
  w-full px-4
`;
