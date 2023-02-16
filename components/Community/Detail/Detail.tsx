import tw from "twin.macro";
import MainLayout from "@/components/layout/MainLayout";
import Navigation from "../Navigation";
import Header from "@/components/common/Header";

const Detail = () => {
  return (
    <MainLayout>
      <DetailWrapper>
        <Navigation />
        <DetailContainer>
          <Header title="자유게시판"></Header>
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
