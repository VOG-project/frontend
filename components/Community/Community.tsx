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
import { getPostsRequest, searchPostRequest } from "@/apis/community";
import { getTitle } from "@/utils/getTitle";
import { CommunityProps, CommunityQuery } from "@/types/community";
import { getAccessToken } from "@/utils/tokenManager";
import { COMMUNITY_SEARCH_OPTION } from "@/constants/search";

const Community = ({ data }: CommunityProps) => {
  const [curPage, setCurPage] = useState(1);
  const [contents, setContents] = useState(data.result.result);
  const [totalCount, setTotalCount] = useState(data.result.totalCount);
  const router = useRouter();
  const { toast } = useToast();
  const { setLoadingFalse, setLoadingTrue } = useLoadingState();
  const query = router.query as CommunityQuery;
  const category = query.category;
  const title = getTitle(category || "");

  useEffect(() => {
    const searchType = query.type;
    const keyword = query.keyword;
    if (searchType && keyword) {
      setCurPage(1);
      searchPost(searchType, keyword, 1);
    } else {
      updatePosts(1);
    }
  }, [query]);

  useEffect(() => {
    const searchType = query.type;
    const keyword = query.keyword;
    if (searchType && keyword) {
      searchPost(searchType, keyword, curPage);
    } else {
      updatePosts(curPage);
    }
  }, [curPage]);

  const updatePosts = async (page: number) => {
    setLoadingTrue();
    const res = await getPostsRequest(category, page);

    if (res.success) {
      setContents(res.result.result);
      setTotalCount(res.result.totalCount);
    } else {
      toast.alert(res.error);
    }

    setLoadingFalse();
  };

  const searchPost = async (
    searchType: string,
    keyword: string,
    page: number
  ) => {
    setLoadingTrue();
    const res = await searchPostRequest(category, searchType, keyword, page);

    if (res.success) {
      if (res.result.totalCount === 0) {
        toast.success("검색결과가 없습니다.");
        router.push(
          {
            query: {
              category: category,
            },
          },
          undefined,
          { shallow: true }
        );
      } else {
        setContents(res.result.result);
        setTotalCount(res.result.totalCount);
      }
    } else {
      toast.alert(res.error);
    }
    setLoadingFalse();
  };

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
  if (res.success) {
    return {
      props: {
        data: { ...res },
      },
    };
  } else {
    return {
      redirect: {
        destination: "/login?authorized=false",
        permanvet: false,
      },
      props: {},
    };
  }
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
