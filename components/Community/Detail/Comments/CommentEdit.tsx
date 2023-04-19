import { useRef, useState, useEffect, ChangeEvent } from "react";
import tw, { styled } from "twin.macro";
import useToast from "@/hooks/useToast";
import Textarea from "@/components/common/Textarea";
import { CommentEditProps } from "@/types/community";

const CommentEdit = ({
  setReply,
  isReply,
  value,
  commentId,
  setIsEditing,
  handleCommentSubmit,
  handleEditCommentSubmit,
}: CommentEditProps) => {
  const [isShow, setIsShow] = useState(!setReply);
  const [commentLength, setCommentLength] = useState(0);
  const { toast } = useToast();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!textareaRef.current) return;
    if (value) {
      textareaRef.current.value = value;
    }
  }, [textareaRef]);

  const handleIsShowToggle = () => {
    setIsShow((prev) => !prev);
  };

  const handleCommentClick = async () => {
    if (!textareaRef.current) return toast.alert("댓글을 입력해주세요.");

    const comment = textareaRef.current.value.trim();
    if (comment.length > 200)
      return toast.alert("댓글은 최대 200자까지 입력할 수 있습니다.");
    handleEditCommentSubmit
      ? await handleEditCommentSubmit(isReply, comment, setIsEditing, commentId)
      : await handleCommentSubmit(comment, commentId);
    textareaRef.current.value = "";
    textareaRef.current.style.height = "auto";
    setCommentLength(0);
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value.trim();
    setCommentLength(text.length);
  };

  return (
    <CommentEditContainer>
      {setReply && (
        <CommentEditBtn onClick={handleIsShowToggle}>답글</CommentEditBtn>
      )}
      {isShow && (
        <CommentTextarea>
          <Textarea
            placeholder="댓글을 입력하세요."
            textareaRef={textareaRef}
            buttonRef={buttonRef}
            handleTextChange={handleTextChange}
          />
          <CommentBntContainer>
            <CommentLength
              isOver={commentLength > 200}
            >{`${commentLength}/200`}</CommentLength>
            {setReply && (
              <CommentCancelBtn onClick={handleIsShowToggle}>
                취소
              </CommentCancelBtn>
            )}
            <CommentSubmitBtn ref={buttonRef} onClick={handleCommentClick}>
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
  flex h-auto border-t border-neutral-700 bg-zinc-600
`;

const CommentSubmitBtn = tw.button`
  w-16 h-full border border-neutral-700 bg-primary
`;

const CommentCancelBtn = tw.button`
  w-16 h-full border border-neutral-700 bg-secondary
`;

const CommentLength = styled.div<{ isOver: boolean }>(({ isOver }) => [
  tw`flex items-center justify-center w-20 bg-transparent`,
  isOver && tw`text-red-500`,
]);
