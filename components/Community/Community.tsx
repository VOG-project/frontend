import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import tw from "twin.macro";
import useToast from "@/hooks/useToast";
import useLoadingState from "@/hooks/useLoadingState";
import MainLayout from "../layout/MainLayout";
import Header from "../common/Header";
import Search from "../common/Search";
import Navigation from "./Navigation";
import Contents from "./Contents";
import Pagination from "../Pagination";
import Button from "../common/Button";
import {
  getPostsRequest,
  getPostCount,
  searchPostRequest,
} from "@/apis/community";
import { getTitle } from "@/utils/getTitle";
import { CommunityProps, CommunityQuery } from "@/types/community";
import { getAccessToken } from "@/utils/tokenManager";
import { COMMUNITY_SEARCH_OPTION } from "@/constants/search";

const Community = ({ data }: CommunityProps) => {
  const [curPage, setCurPage] = useState(1);
  const [contents, setContents] = useState(data.result);
  const [totalCount, setTotalCount] = useState(data.postCount);
  const router = useRouter();
  const { toast } = useToast();
  const { setLoadingFalse, setLoadingTrue } = useLoadingState();
  const query = router.query as CommunityQuery;
  const category = query.category;
  const title = getTitle(category || "");

  useEffect(() => {
    (async () => {
      setLoadingTrue();
      const res = await getPostsRequest(category, 1);
      setContents(res.result);
      await getPostCount(category).then((res) => setTotalCount(res.result));
      setLoadingFalse();
    })();
  }, [category]);

  useEffect(() => {
    const searchType = query.type;
    const keyword = query.keyword;
    if (searchType && keyword) {
      (async () => {
        setLoadingTrue();
        setCurPage(1);
        const res = await searchPostRequest(
          category,
          searchType,
          keyword,
          curPage
        );
        if (res.success) {
          if (res.result.totalCount === 0) {
            toast.success("검색결과가 없습니다.");
          } else {
            setContents(res.result.searchedResult);
            setTotalCount(res.result.totalCount);
          }
        } else {
          toast.alert(res.error);
        }
        setLoadingFalse();
      })();
    }
  }, [query, curPage]);

  const handleEditButtonClick = () => {
    router.push({
      pathname: "/community/edit",
      query: {
        category: category,
      },
    });
  };

  const handleContentClick = (postId: number) => {
    router.push({
      pathname: "/community/[id]",
      query: { id: postId, category: category },
    });
  };

  return (
    <MainLayout>
      <CommunityWrapper>
        <Navigation category={category} />
        <CommunityContainer>
          <Header title={title ? title : ""}>
            <Search options={COMMUNITY_SEARCH_OPTION} />
          </Header>
          <Contents
            contents={contents}
            handleContentClick={handleContentClick}
          />
        </CommunityContainer>
        <CommunityButtonContainer>
          <Pagination
            curPage={curPage}
            count={totalCount}
            setCurPage={setCurPage}
          />
          <Button
            width={6}
            bgColor="primary"
            position={{ type: "absolute", top: "0", right: "8rem" }}
            onClick={handleEditButtonClick}
          >
            글쓰기
          </Button>
        </CommunityButtonContainer>
      </CommunityWrapper>
    </MainLayout>
  );
};

export default Community;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const req = context.req;
  const accessToken = getAccessToken(req);
  const query = context.query as CommunityQuery;
  const category = query.category;

  const res = await getPostsRequest(category, 1, accessToken);
  const postCountRes = await getPostCount(category, accessToken);

  return {
    props: {
      data: { ...res, postCount: postCountRes },
    },
  };
};

const CommunityWrapper = tw.article`
  w-full ml-64 p-4
`;

const CommunityContainer = tw.section`
  w-full px-10
`;

const CommunityButtonContainer = tw.div`
  relative p-4
`;
