import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import tw from "twin.macro";
import MainLayout from "@/components/layout/MainLayout";
import Navigation from "../Navigation";
import Header from "@/components/common/Header";
import Button from "@/components/common/Button";
import Post from "./Post";
import { getPostRequest } from "@/apis/community";
import { getTitle } from "@/utils/getTitle";
import { getIcons } from "@/components/icons";
import { CommunityQuery, ContentDetail } from "@/types/community";

const Detail = () => {
  const [content, setContent] = useState<ContentDetail>();
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const router = useRouter();
  const query = router.query as CommunityQuery;

  useEffect(() => {
    setCategory(query.category);
    setTitle(getTitle(category));
    (async () => {
      const res = await getPostRequest(query.category, Number(query.id));

      if (res.success) {
        setContent(res.result);
      }
    })();
  }, [query, category]);

  const handleListButton = () => {
    category ? router.push(`${category}`) : router.push("/community");
  };
  return (
    <MainLayout>
      <DetailWrapper>
        <Navigation category={category} />
        <DetailContainer>
          <Header title={title}>
            <Button width={5} bgColor="transparent" onClick={handleListButton}>
              <ListButton>{getIcons("list", 24)}목록</ListButton>
            </Button>
          </Header>
          <Post content={content} />
        </DetailContainer>
      </DetailWrapper>
    </MainLayout>
  );
};

export default Detail;

const DetailWrapper = tw.article`
  w-full ml-64 p-4
`;

const DetailContainer = tw.section`
  w-full px-10
`;

const ListButton = tw.div`
  flex items-center justify-center
`;
