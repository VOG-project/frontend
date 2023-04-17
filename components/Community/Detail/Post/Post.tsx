import { useRouter } from "next/router";
import tw from "twin.macro";
import Comments from "../Comments";
import Button from "@/components/common/Button";
import { getIcons } from "@/components/icons";
import { PostProps } from "@/types/community";
import timeDifference from "@/utils/timeDifference";

const Post = ({
  userId,
  content,
  comments,
  likes,
  handleDeletePostClick,
  handleCommentSubmit,
  handleDeleteCommentClick,
  handleEditCommentSubmit,
  handleLikeButtonClick,
  handleUserProfileOpen,
}: PostProps) => {
  const router = useRouter();
  if (!content) return null;
  return (
    <PostContainer>
      <PostTitle>
        <PostSubject>
          <PostGame>[발로란트]</PostGame>
          {content.title}
        </PostSubject>
        {userId === content.user.id && (
          <PostEditButtonContainer>
            <Button
              bgColor="primary"
              width={4}
              onClick={() => {
                router.push({
                  pathname: "/community/edit",
                  query: {
                    ...router.query,
                    editMode: "true",
                  },
                });
              }}
            >
              수정
            </Button>
            <Button
              bgColor="secondary"
              width={4}
              onClick={() => handleDeletePostClick(content.id)}
            >
              삭제
            </Button>
          </PostEditButtonContainer>
        )}
      </PostTitle>
      <PostAuthor>
        <PostNickname onClick={() => handleUserProfileOpen(content.user.id)}>
          {content.user.nickname}
        </PostNickname>
        <PostInfoContainer>
          <PostInfo>
            {getIcons("thumb", 16)}
            <PostInfoText>{likes.length}</PostInfoText>
          </PostInfo>
          <PostInfo>
            {getIcons("eye", 16)}
            <PostInfoText>{content.view}</PostInfoText>
          </PostInfo>
          <PostInfo>
            {getIcons("time", 16)}
            <PostInfoText>{timeDifference(content.updatedAt)}</PostInfoText>
          </PostInfo>
        </PostInfoContainer>
      </PostAuthor>
      <PostTextContainer>
        <PostText dangerouslySetInnerHTML={{ __html: content.content }} />
        <PostLike>
          <Button bgColor="primary" width={6} onClick={handleLikeButtonClick}>
            <LikeButton>
              {getIcons("thumb", 16)}
              <LikeCount>{likes.length}</LikeCount>
            </LikeButton>
          </Button>
        </PostLike>
      </PostTextContainer>
      <Comments
        userId={userId}
        comments={comments}
        handleCommentSubmit={handleCommentSubmit}
        handleDeleteCommentClick={handleDeleteCommentClick}
        handleEditCommentSubmit={handleEditCommentSubmit}
        handleUserProfileOpen={handleUserProfileOpen}
      />
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

const PostNickname = tw.span``;

const PostTextContainer = tw.div``;

const PostText = tw.div`
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

const PostEditButtonContainer = tw.div`
  flex gap-4 ml-auto
`;
