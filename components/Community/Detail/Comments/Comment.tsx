import { useState } from "react";
import tw from "twin.macro";
import CommentEdit from "./CommentEdit";
import { CommentProps } from "@/types/community";
import timeDifference from "@/utils/timeDifference";
import { getIcons } from "@/components/icons";

const Comment = ({
  id,
  author,
  createdAt,
  content,
  group,
  sequence,
  reply,
  handleCommentSubmit,
  handleUserProfileOpen,
}: CommentProps) => {
  const [replyToggle, setReplyToggle] = useState(false);

  return (
    <CommentContainer>
      <CommentAuthor>
        <CommentNickname onClick={() => handleUserProfileOpen(id)}>
          {author}
        </CommentNickname>
        <CommentTime>{timeDifference(createdAt)}</CommentTime>
      </CommentAuthor>
      <CommentText>{content}</CommentText>
      <CommentEdit
        isReply={true}
        group={group}
        sequence={sequence}
        handleCommentSubmit={handleCommentSubmit}
      />
      {reply.length > 1 && (
        <ReplyToggle onClick={() => setReplyToggle((prev) => !prev)}>
          {replyToggle ? getIcons("on", 24) : getIcons("off", 24)}답글
          {reply.length - 1}개
        </ReplyToggle>
      )}
      {replyToggle &&
        reply
          .filter((reply) => reply.sequence > 0)
          .map((reply) => {
            return (
              <CommentReply key={reply.id}>
                <ReturnIcon>{getIcons("return", 24)}</ReturnIcon>
                <CommentAuthor>
                  <CommentNickname
                    onClick={() => handleUserProfileOpen(reply.user.id)}
                  >
                    {reply.user.nickname}
                  </CommentNickname>
                  <CommentTime>{timeDifference(reply.createdAt)}</CommentTime>
                </CommentAuthor>
                <CommentText>{reply.content}</CommentText>
                <CommentEdit
                  isReply={true}
                  group={reply.group}
                  sequence={reply.sequence}
                  handleCommentSubmit={handleCommentSubmit}
                />
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
  flex
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

const CommentReply = tw.div`
  relative px-8
`;

const ReplyToggle = tw.div`
  flex gap-1 text-primary cursor-pointer
`;

const ReturnIcon = tw.div`
  absolute left-0 top-8
`;
