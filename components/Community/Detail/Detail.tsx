import { useRouter } from "next/router";
import tw from "twin.macro";
import MainLayout from "@/components/layout/MainLayout";
import Navigation from "../Navigation";
import Header from "@/components/common/Header";
import { getTitle } from "@/utils/getTitle";

const Detail = () => {
  const router = useRouter();
  const query = router.query;
  const category = typeof query.category === "string" ? query.category : "";
  const title = getTitle(category);
  return (
    <MainLayout>
      <DetailWrapper>
        <Navigation category={category} />
        <DetailContainer>
          <Header title={title}></Header>
        </DetailContainer>
      </DetailWrapper>
    </MainLayout>
  );
};

export default Detail;

const DetailWrapper = tw.article`
  w-full ml-64 py-4 px-4
`;

const DetailContainer = tw.section``;
