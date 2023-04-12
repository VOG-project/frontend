import tw from "twin.macro";
import Comment from "./Comment";
import CommentEdit from "./CommentEdit";
import { CommentsProps } from "@/types/community";

const Comments = ({
  comments,
  handleCommentSubmit,
  handleUserProfileOpen,
}: CommentsProps) => {
  return (
    <CommentsContainer>
      <CommentsTitle>댓글</CommentsTitle>
      <CommentEdit
        isReply={false}
        group={undefined}
        sequence={0}
        handleCommentSubmit={handleCommentSubmit}
      />
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            id={comment.id}
            author={comment.user.nickname}
            createdAt={comment.createdAt}
            content={comment.content}
            group={comment.group}
            reply={comment.reply}
            handleCommentSubmit={handleCommentSubmit}
            handleUserProfileOpen={handleUserProfileOpen}
          />
        );
      })}
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
