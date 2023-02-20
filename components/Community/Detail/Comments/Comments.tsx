import tw from "twin.macro";

const Comments = () => {
  return (
    <CommentsContainer>
      <CommentsTitle>댓글 1</CommentsTitle>
      <Comment>
        <CommentAuthor>
          사부로
          <CommentTime>2023.01.01</CommentTime>
        </CommentAuthor>
        <CommentText>저랑 해요</CommentText>
      </Comment>
      <Comment>
        <CommentAuthor>사부로</CommentAuthor>
        <CommentText>저랑 해요</CommentText>
      </Comment>
    </CommentsContainer>
  );
};

export default Comments;

const CommentsContainer = tw.div`
  relative divide-y divide-neutral-700
`;

const CommentsTitle = tw.div`
  flex items-center px-4 h-8 bg-zinc-900
`;

const Comment = tw.div`
  p-4
`;

const CommentAuthor = tw.span``;

const CommentTime = tw.span``;

const CommentText = tw.p``;
