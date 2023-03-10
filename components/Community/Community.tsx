import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import MainLayout from "../layout/MainLayout";
import Header from "../common/Header";
import Search from "../common/Search";
import Navigation from "./Navigation";
import Contents from "./Contents";
import Pagination from "../Pagination";
import Button from "../common/Button";
import { getPostsRequest } from "@/apis/community";
import { getTitle } from "@/utils/getTitle";
import { Content } from "@/types/community";

interface CommunityProps {
  data: {
    success: boolean;
    result: Content[];
  };
  category?: string;
}

const Community = ({ data, category }: CommunityProps) => {
  const [contents, setContents] = useState(data.result);
  const router = useRouter();
  const title = getTitle(category || "");
  const curCategory = category || "";

  const handleEditButton = () => {
    router.push({
      pathname: "/community/edit",
      query: {
        category: curCategory,
      },
    });
  };

  useEffect(() => {
    (async () => {
      const res = await getPostsRequest(curCategory, 1);
      setContents(res.result);
    })();
  }, [curCategory]);

  return (
    <MainLayout>
      <CommunityWrapper>
        <Navigation category={curCategory} />
        <CommunityContainer>
          <Header title={title ? title : "전체"}>
            <Search />
          </Header>
          <Contents contents={contents} category={curCategory} />
        </CommunityContainer>
        <CommunityButtonContainer>
          <Pagination />
          <Button
            width={6}
            position={{ type: "absolute", top: "0", right: "8rem" }}
            onClick={handleEditButton}
          >
            글쓰기
          </Button>
        </CommunityButtonContainer>
      </CommunityWrapper>
    </MainLayout>
  );
};

export default Community;

const CommunityWrapper = tw.article`
  w-full ml-64 p-4
`;

const CommunityContainer = tw.section`
  w-full px-10
`;

const CommunityButtonContainer = tw.div`
  relative p-4
`;
