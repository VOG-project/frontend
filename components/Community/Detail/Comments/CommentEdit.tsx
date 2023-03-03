import tw from "twin.macro";

const CommentEdit = () => {
  return (
    <CommentEditContainer>
      <CommentEditTextArea placeholder="댓글을 입력하세요." />
      <CommentBntContainer>
        <CommentSubmitBtn>SEND</CommentSubmitBtn>
      </CommentBntContainer>
    </CommentEditContainer>
  );
};

export default CommentEdit;

const CommentEditContainer = tw.div`
  flex flex-col w-full h-64 border border-neutral-700
`;

const CommentEditTextArea = tw.textarea`
  shrink-0 p-4 w-full h-48 bg-black resize-none
  focus:(outline-none placeholder-transparent)
`;

const CommentBntContainer = tw.div`
  w-full h-full border-t border-neutral-700
`;

const CommentSubmitBtn = tw.button`
  float-right w-32 h-full border border-neutral-700 bg-primary

`;
