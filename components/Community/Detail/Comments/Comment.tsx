import { useState } from "react";
import tw from "twin.macro";
import CommentEdit from "./CommentEdit";
import Button from "@/components/common/Button";
import { CommentProps } from "@/types/community";
import timeDifference from "@/utils/timeDifference";
import { getIcons } from "@/components/icons";

const Comment = ({
  comment,
  userId,
  handleCommentSubmit,
  handleRemoveCommentClick,
  handleUserProfileOpen,
}: CommentProps) => {
  const [replyToggle, setReplyToggle] = useState(false);
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
            <Button bgColor="transparent" width={4} height={2}>
              수정
            </Button>
            <Button
              bgColor="transparent"
              width={4}
              height={2}
              onClick={() => handleRemoveCommentClick(comment.id)}
            >
              삭제
            </Button>
          </CommentButtonContainer>
        )}
      </CommentAuthor>
      <CommentText>{comment.content}</CommentText>
      <CommentEdit isReply={true} handleCommentSubmit={handleCommentSubmit} />
      {replies.length > 0 && (
        <ReplyToggle onClick={() => setReplyToggle((prev) => !prev)}>
          {replyToggle ? getIcons("on", 24) : getIcons("off", 24)}답글
          {replies.length}개
        </ReplyToggle>
      )}
      {replyToggle &&
        replies.map((reply) => {
          return (
            <CommentReply key={reply.id}>
              <CommentAuthor>
                <CommentNickname
                  onClick={() => handleUserProfileOpen(reply.user.id)}
                >
                  {reply.user.nickname}
                </CommentNickname>
                <CommentTime>{timeDifference(reply.createdAt)}</CommentTime>
                {userId === reply.user.id && (
                  <CommentButtonContainer>
                    <Button bgColor="transparent" width={4} height={2}>
                      수정
                    </Button>
                    <Button
                      bgColor="transparent"
                      width={4}
                      height={2}
                      onClick={() => handleRemoveCommentClick(reply.id)}
                    >
                      삭제
                    </Button>
                  </CommentButtonContainer>
                )}
              </CommentAuthor>
              <CommentText>{reply.content}</CommentText>
            </CommentReply>
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

const CommentReply = tw.div`
  relative px-8 mb-2
  before:(content-[""] absolute top-4 left-2 w-6 h-8 border-l border-b border-neutral-700)
`;

const ReplyToggle = tw.div`
  flex gap-1 text-primary cursor-pointer
`;
