import tw from "twin.macro";
import Comments from "../Comments";
import Button from "@/components/common/Button";
import { getIcons } from "@/components/icons";
import { PostProps } from "@/types/community";
import timeDifference from "@/utils/timeDifference";

const Post = ({ content }: PostProps) => {
  if (!content) return null;
  return (
    <PostContainer>
      <PostTitle>
        <PostSubject>
          <PostGame>[{content.gameCategory}]</PostGame>
          {content.title}
        </PostSubject>
      </PostTitle>
      <PostAuthor>
        {content.user.nickname}
        <PostInfoContainer>
          <PostInfo>
            {getIcons("thumb", 16)}
            <PostInfoText>{content.likeCount}</PostInfoText>
          </PostInfo>
          <PostInfo>
            {getIcons("eye", 16)}
            <PostInfoText>18992</PostInfoText>
          </PostInfo>
          <PostInfo>
            {getIcons("time", 16)}
            <PostInfoText>{timeDifference(content.updatedAt)}</PostInfoText>
          </PostInfo>
        </PostInfoContainer>
      </PostAuthor>
      <PostTextContainer>
        <PostText>{content.content}</PostText>
        <PostLike>
          <Button bgColor="primary" width={6}>
            <LikeButton>
              {getIcons("thumb", 16)}
              <LikeCount>{content.likeCount}</LikeCount>
            </LikeButton>
          </Button>
        </PostLike>
      </PostTextContainer>
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

const PostTextContainer = tw.div``;

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

const PostInfoContainer = tw.div`
  flex w-96 items-center justify-around text-primary
`;

const PostInfo = tw.div`
  flex items-center
`;

const PostInfoText = tw.span`
  text-white
`;
