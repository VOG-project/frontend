import { useRouter } from "next/router";
import tw from "twin.macro";
import { getIcons } from "@/components/icons";
import { Content } from "@/types/community";

interface ContentsProps {
  contents: Content[];
  category: string;
}

const Contents = ({ contents, category }: ContentsProps) => {
  const router = useRouter();
  const handleContentClick = () => {
    router.push({
      pathname: "/community/[id]",
      query: { id: "123", category: category },
    });
  };
  return (
    <ContentsContainer>
      {contents.map((content) => {
        return (
          <ContentContainer key={content.id} onClick={handleContentClick}>
            <ContentGame>{content.gameCategory}</ContentGame>
            <ContentTitle>
              {content.title}
              <CommentCount>[0]</CommentCount>
            </ContentTitle>
            <ContentAuthor>{content.writerId}</ContentAuthor>
            <ContentHit>{getIcons("eye", 18)}29</ContentHit>
            <ContentTime>{getIcons("time", 18)}1시간전</ContentTime>
          </ContentContainer>
        );
      })}
    </ContentsContainer>
  );
};

export default Contents;

const ContentsContainer = tw.section`
  border-y-2 border-neutral-700 divide-y divide-neutral-700
`;

const ContentContainer = tw.div`
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
