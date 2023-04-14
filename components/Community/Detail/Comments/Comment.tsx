import { useState } from "react";
import tw from "twin.macro";
import CommentEdit from "./CommentEdit";
import Button from "@/components/common/Button";
import Reply from "./Reply";
import { CommentProps } from "@/types/community";
import timeDifference from "@/utils/timeDifference";
import { getIcons } from "@/components/icons";

const Comment = ({
  comment,
  userId,
  handleCommentSubmit,
  handleRemoveCommentClick,
  handleEditCommentSubmit,
  handleUserProfileOpen,
}: CommentProps) => {
  const [replyToggle, setReplyToggle] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const replies = comment.replies;
  const isOwner = userId === comment.user.id;
  return (
    <CommentContainer>
      <CommentAuthor>
        <CommentNickname onClick={() => handleUserProfileOpen(comment.user.id)}>
          {comment.user.nickname}
        </CommentNickname>
        <CommentTime>{timeDifference(comment.createdAt)}</CommentTime>
        {isOwner && (
          <CommentButtonContainer>
            <Button
              bgColor="transparent"
              width={4}
              height={2}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              수정
            </Button>
            <Button
              bgColor="transparent"
              width={4}
              height={2}
              onClick={async () =>
                await handleRemoveCommentClick(false, comment.id)
              }
            >
              삭제
            </Button>
          </CommentButtonContainer>
        )}
      </CommentAuthor>
      {isEditing ? (
        <CommentEdit
          setReply={false}
          isReply={false}
          value={comment.content}
          commentId={comment.id}
          handleCommentSubmit={handleCommentSubmit}
          handleEditCommentSubmit={handleEditCommentSubmit}
        />
      ) : (
        <CommentText>{comment.content}</CommentText>
      )}
      <CommentEdit
        setReply={true}
        isReply={true}
        commentId={comment.id}
        handleCommentSubmit={handleCommentSubmit}
      />
      {replies.length > 0 && (
        <ReplyToggle onClick={() => setReplyToggle((prev) => !prev)}>
          {replyToggle ? getIcons("on", 24) : getIcons("off", 24)}답글
          {replies.length}개
        </ReplyToggle>
      )}
      {replyToggle &&
        replies.map((reply) => {
          return (
            <Reply
              key={reply.id}
              userId={userId}
              comment={reply}
              handleCommentSubmit={handleCommentSubmit}
              handleRemoveCommentClick={handleRemoveCommentClick}
              handleEditCommentSubmit={handleEditCommentSubmit}
              handleUserProfileOpen={handleUserProfileOpen}
            />
          );
        })}
    </CommentContainer>
  );
};

export default Comment;

const CommentContainer = tw.div`
  px-4 py-2
`;

const CommentAuthor = tw.div`
  flex items-center w-full px-4 h-8 bg-zinc-900
`;

const CommentNickname = tw.span`
  cursor-pointer
`;

const CommentTime = tw.div`
  ml-2 px-2 rounded-full text-zinc-400 bg-zinc-600/40
`;

const CommentText = tw.p`
  my-2 px-2
`;

const CommentButtonContainer = tw.div`
  flex gap-2 ml-auto text-blue-500
`;

const ReplyToggle = tw.div`
  flex gap-1 text-primary cursor-pointer
`;
