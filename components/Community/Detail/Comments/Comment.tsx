import tw from "twin.macro";

const Comment = () => {
  return (
    <CommentContainer>
      <CommentTitle>댓글 1</CommentTitle>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = tw.div``;

const CommentTitle = tw.div``;
