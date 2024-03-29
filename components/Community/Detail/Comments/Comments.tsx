import tw from "twin.macro";
import Comment from "./Comment";
import CommentEdit from "./CommentEdit";
import { CommentsProps } from "@/types/community";

const Comments = ({
  userId,
  comments,
  handleCommentSubmit,
  handleDeleteCommentClick,
  handleEditCommentSubmit,
  handleUserProfileOpen,
}: CommentsProps) => {
  return (
    <CommentsContainer>
      <CommentsTitle>댓글</CommentsTitle>
      <CommentEdit
        setReply={false}
        isReply={false}
        handleCommentSubmit={handleCommentSubmit}
      />
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            userId={userId}
            handleCommentSubmit={handleCommentSubmit}
            handleDeleteCommentClick={handleDeleteCommentClick}
            handleEditCommentSubmit={handleEditCommentSubmit}
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
