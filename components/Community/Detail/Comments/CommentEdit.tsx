import { useRef, useState } from "react";
import tw from "twin.macro";
import Textarea from "@/components/common/Textarea";
import { CommentEditProps } from "@/types/community";

const CommentEdit = ({
  isReply,
  commentId,
  handleCommentSubmit,
}: CommentEditProps) => {
  const [isEditing, setIsEditing] = useState(!isReply);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleIsEditingToggle = () => {
    setIsEditing((prev) => !prev);
  };

  return (
    <CommentEditContainer>
      {isReply && (
        <CommentEditBtn onClick={handleIsEditingToggle}>답글</CommentEditBtn>
      )}
      {isEditing && (
        <CommentTextarea>
          <Textarea
            placeholder="댓글을 입력하세요."
            textareaRef={textareaRef}
            buttonRef={buttonRef}
          />

          <CommentBntContainer>
            {isReply && (
              <CommentCancelBtn onClick={handleIsEditingToggle}>
                취소
              </CommentCancelBtn>
            )}

            <CommentSubmitBtn
              ref={buttonRef}
              onClick={async () => {
                await handleCommentSubmit(
                  textareaRef.current?.value,
                  commentId
                );
                if (textareaRef.current) textareaRef.current.value = "";
              }}
            >
              댓글
            </CommentSubmitBtn>
          </CommentBntContainer>
        </CommentTextarea>
      )}
    </CommentEditContainer>
  );
};

export default CommentEdit;

const CommentEditContainer = tw.div`
  w-full mb-2
`;

const CommentEditBtn = tw.button`
  text-blue-500
`;

const CommentTextarea = tw.div`
  flex h-auto
`;

const CommentBntContainer = tw.div`
  flex h-auto border-t border-neutral-700
`;

const CommentSubmitBtn = tw.button`
  w-16 h-full border border-neutral-700 bg-primary
`;

const CommentCancelBtn = tw.button`
  w-16 h-full border border-neutral-700 bg-secondary
`;
