import tw from "twin.macro";

const Comment = () => {
  return (
    <CommentContainer>
      <CommentAuthor>
        사부로
        <CommentTime>2023.01.01 PM 09:45</CommentTime>
      </CommentAuthor>
      <CommentText>저랑 해요</CommentText>
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = tw.div`
  px-4 py-2
`;

const CommentAuthor = tw.div`
  flex
`;

const CommentTime = tw.div`
  ml-2 text-zinc-400
`;

const CommentText = tw.p`
  mt-2
`;
