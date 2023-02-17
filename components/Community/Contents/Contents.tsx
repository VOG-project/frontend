import { useRouter } from "next/router";
import tw from "twin.macro";
import { getIcons } from "@/components/icons";

interface ContentsProps {
  category: string;
}

const Contents = ({ category }: ContentsProps) => {
  const router = useRouter();
  const handleContentClick = () => {
    router.push({
      pathname: "/community/[id]",
      query: { id: "123", category: category },
    });
  };
  return (
    <ContentsContainer>
      <Content onClick={handleContentClick}>
        <ContentGame>LOL</ContentGame>
        <ContentTitle>
          랭겜 <CommentCount>[0]</CommentCount>
        </ContentTitle>
        <ContentAuthor>사부로</ContentAuthor>
        <ContentHit>{getIcons("eye", 18)}29</ContentHit>
        <ContentTime>{getIcons("time", 18)}1시간전</ContentTime>
      </Content>
    </ContentsContainer>
  );
};

export default Contents;

const ContentsContainer = tw.section`
  border-y-2 border-neutral-700 divide-y divide-neutral-700
`;

const Content = tw.div`
  flex items-center w-full h-20 px-4 text-center
`;

const ContentGame = tw.div`
  w-1/12
`;

const ContentTitle = tw.div`
  w-8/12 text-left
`;

const CommentCount = tw.span`
  text-primary 
`;

const ContentAuthor = tw.div`
  w-1/12
`;

const ContentHit = tw.div`
  flex justify-center items-center w-1/12
`;

const ContentTime = tw.div`
  flex justify-center items-center w-1/12
`;
