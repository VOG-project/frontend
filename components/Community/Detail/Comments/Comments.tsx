import tw from "twin.macro";
import Comment from "./Comment";
import CommentEdit from "./CommentEdit";
import Pagination from "@/components/Pagination";

const Comments = () => {
  return (
    <CommentsContainer>
      <CommentsTitle>댓글 1</CommentsTitle>
      <Comment />
      <Pagination />
      <CommentEdit />
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
