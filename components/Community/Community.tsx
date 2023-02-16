import tw from "twin.macro";
import { useRouter } from "next/router";
import MainLayout from "../layout/MainLayout";
import Header from "../common/Header";
import Search from "../common/Search";
import Navigation from "./Navigation";
import Contents from "./Contents";
import { NAV_MENU } from "./Navigation/Navigation";

const Community = () => {
  const router = useRouter();
  const { category } = router.query;
  const title = NAV_MENU.find((menu) => {
    return menu.href === category;
  });
  return (
    <MainLayout>
      <CommunityWrapper>
        <Navigation />
        <CommunityContainer>
          <Header title={title ? title.name : ""}>
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
