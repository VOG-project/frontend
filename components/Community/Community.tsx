import tw from "twin.macro";
import MainLayout from "../layout/MainLayout";
import Header from "../common/Header";
import Search from "../common/Search";
import Navigation from "./Navigation";
import Contents from "./Contents";
import { getTitle } from "@/utils/getTitle";

interface CommunityProps {
  category?: string;
}

const Community = ({ category }: CommunityProps) => {
  const title = getTitle(category || "");
  const curCategory = category || "";
  return (
    <MainLayout>
      <CommunityWrapper>
        <Navigation category={curCategory} />
        <CommunityContainer>
          <Header title={title ? title : "전체"}>
            <Search />
          </Header>
          <Contents category={curCategory} />
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
  w-full px-10
`;
