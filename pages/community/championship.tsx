import { GetServerSideProps } from "next";
import Community from "@/components/Community";
import { getPostsRequest } from "@/apis/community";
import { CommunityProps } from "@/types/community";

const Championship = ({ data }: CommunityProps) => {
  return (
    <>
      <Community data={data} category="championship" />
    </>
  );
};
export default Championship;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const category = context.resolvedUrl.split("/")[2];
  const res = await getPostsRequest(category, 1);

  // 전체 페이지 갯수 요청...
  return { props: { data: res } };
};
