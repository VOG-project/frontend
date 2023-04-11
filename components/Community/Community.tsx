import axios from "axios";
import { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import tw from "twin.macro";
import MainLayout from "../layout/MainLayout";
import Header from "../common/Header";
import Search from "../common/Search";
import Navigation from "./Navigation";
import Contents from "./Contents";
import Pagination from "../Pagination";
import Button from "../common/Button";
import { getPostsRequest, getPostCount } from "@/apis/community";
import { getTitle } from "@/utils/getTitle";
import { CommunityProps, CommunityQuery } from "@/types/community";

const Community = ({ data }: CommunityProps) => {
  const [curPage, setCurPage] = useState(1);
  const [contents, setContents] = useState(data.result);
  const [totalCount, setTotalCount] = useState(data.postCount);
  const router = useRouter();
  const query = router.query as CommunityQuery;
  const category = query.category;
  const title = getTitle(category || "");

  useEffect(() => {
    (async () => {
      const res = await getPostsRequest(category, 1);
      setContents(res.result);
      await getPostCount(category).then((res) => setTotalCount(res.result));
    })();
  }, [category]);

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
            <Search />
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
  const query = context.query as CommunityQuery;
  const category = query.category;

  const postRes = await axios.get("/posts", {
    headers: {
      "Content-Type": "Application/json",
      Cookie: req.headers.cookie,
    },
    params: {
      board: category,
      page: 1,
    },
  });

  const postCountRes = await axios.get("/posts/count", {
    headers: {
      "Content-Type": "Application/json",
      Cookie: req.headers.cookie,
    },
    params: {
      category: category,
    },
  });

  // const res = await getPostsRequest(category, 1));
  // const postCountRes = await getPostCount(category);

  return {
    props: {
      data: { ...postRes.data.result, postCount: postCountRes.data.result },
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
