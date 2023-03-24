import { useRouter } from "next/router";
import tw from "twin.macro";
import { getIcons } from "@/components/icons";
import { Content } from "@/types/community";
import timeDifference from "@/utils/timeDifference";

interface ContentsProps {
  contents: Content[];
  category: string;
}

const Contents = ({ contents, category }: ContentsProps) => {
  const router = useRouter();
  const handleContentClick = (postId: number) => {
    router.push({
      pathname: "/community/[id]",
      query: { id: postId, category: category },
    });
  };
  return (
    <ContentsContainer>
      {contents.map((content) => {
        return (
          <ContentContainer
            key={content.id}
            onClick={() => handleContentClick(content.id)}
          >
            <ContentLikeCount>
              {getIcons("thumb", 18)}
              {content.likeCount}
            </ContentLikeCount>
            <ContentGame>리그오브레전드</ContentGame>
            <ContentTitle>
              {content.title}
              <CommentCount>[0]</CommentCount>
            </ContentTitle>
            <ContentAuthor>{content.id}</ContentAuthor>
            <ContentHit>
              {getIcons("thumb", 18)}
              {content.likeCount}
            </ContentHit>
            <ContentTime>
              {getIcons("time", 18)}
              {timeDifference(content.createdAt)}
            </ContentTime>
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
  flex items-center w-full h-12 px-4 text-center
`;

const ContentGame = tw.span`
  w-1/12
`;

const ContentTitle = tw.span`
  grow text-left
`;

const CommentCount = tw.span`
  text-primary 
`;

const ContentAuthor = tw.span`
  w-1/12
`;

const ContentLikeCount = tw.span`
  flex w-[5%] justify-center items-center px-2
`;

const ContentHit = tw.span`
  flex justify-center items-center px-2
`;

const ContentTime = tw.div`
  flex justify-center items-center w-1/12
`;
