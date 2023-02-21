import tw from "twin.macro";
import Comments from "../Comments";
import Button from "@/components/common/Button";
import { getIcons } from "@/components/icons";

const Post = () => {
  return (
    <PostContainer>
      <PostTitle>
        <PostSubject>
          <PostGame>[LOL]</PostGame>
          랭겜
        </PostSubject>
      </PostTitle>
      <PostAuthor>
        사부로
        <DetailInfoContainer>
          <DetailInfo>
            {getIcons("thumb", 16)}
            <DetailText>200</DetailText>
          </DetailInfo>
          <DetailInfo>
            {getIcons("eye", 16)}
            <DetailText>18992</DetailText>
          </DetailInfo>
          <DetailInfo>
            {getIcons("time", 16)}
            <DetailText>2023.01.01</DetailText>
          </DetailInfo>
        </DetailInfoContainer>
      </PostAuthor>
      <PostText>
        안녕하세요 랭겜할래요
        <PostLike>
          <Button width={6}>
            <LikeButton>
              {getIcons("thumb", 16)}
              <LikeCount>20</LikeCount>
            </LikeButton>
          </Button>
        </PostLike>
      </PostText>
      <Comments />
    </PostContainer>
  );
};

export default Post;

const PostContainer = tw.div`
  border-y-2 border-neutral-700 divide-y divide-neutral-700  
`;

const PostTitle = tw.div`
  flex items-center px-4 w-full h-20
`;

const PostGame = tw.span`
  mr-2 text-secondary
`;

const PostSubject = tw.h3`
  text-2xl text-left
`;

const PostAuthor = tw.div`
  flex items-center justify-between px-4 h-8 bg-zinc-900
`;

const PostText = tw.p`
  p-12
`;

const PostLike = tw.div`
  w-full text-center
`;

const LikeButton = tw.div`
  flex items-center justify-center
`;

const LikeCount = tw.div`
  before:(content-["|"] m-3)
`;

const DetailInfoContainer = tw.div`
  flex w-96 items-center justify-around text-primary
`;

const DetailInfo = tw.div`
  flex items-center
`;

const DetailText = tw.span`
  text-white
`;
