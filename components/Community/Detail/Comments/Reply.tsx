import { useState } from "react";
import tw from "twin.macro";
import CommentEdit from "./CommentEdit";
import Button from "@/components/common/Button";
import { CommentProps } from "@/types/community";
import timeDifference from "@/utils/timeDifference";

const Reply = ({
  userId,
  comment: reply,
  handleCommentSubmit,
  handleDeleteCommentClick,
  handleEditCommentSubmit,
  handleUserProfileOpen,
}: CommentProps) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <ReplyContainer key={reply.id}>
      <ReplyAuthor>
        <ReplyNickname onClick={() => handleUserProfileOpen(reply.user.id)}>
          {reply.user.nickname}
        </ReplyNickname>
        <ReplyTime>{timeDifference(reply.createdAt)}</ReplyTime>
        {userId === reply.user.id && (
          <ReplyButtonContainer>
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
                await handleDeleteCommentClick(true, reply.id)
              }
            >
              삭제
            </Button>
          </ReplyButtonContainer>
        )}
      </ReplyAuthor>
      {isEditing ? (
        <CommentEdit
          setReply={false}
          isReply={true}
          value={reply.content}
          commentId={reply.id}
          setIsEditing={setIsEditing}
          handleCommentSubmit={handleCommentSubmit}
          handleEditCommentSubmit={handleEditCommentSubmit}
        />
      ) : (
        <ReplyText>{reply.content}</ReplyText>
      )}
    </ReplyContainer>
  );
};

export default Reply;

const ReplyContainer = tw.div`
  relative px-8 mb-2
  before:(content-[""] absolute top-4 left-2 w-6 h-8 border-l border-b border-neutral-700)
`;

const ReplyAuthor = tw.div`
  flex items-center w-full px-4 h-8 bg-zinc-900
`;

const ReplyNickname = tw.span`
  cursor-pointer
`;

const ReplyTime = tw.div`
  ml-2 px-2 rounded-full text-zinc-400 bg-zinc-600/40
`;

const ReplyText = tw.p`
  my-2 px-2
`;

const ReplyButtonContainer = tw.div`
  flex gap-2 ml-auto text-blue-500
`;
