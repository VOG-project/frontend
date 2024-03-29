import tw from "twin.macro";
import useChatEditForm from "@/hooks/useChatEditForm";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import { ChatEditProps } from "@/types/chat";

const ChatEdit = ({
  isOpen,
  handleModalClose,
  handleChatRoomCreate,
}: ChatEditProps) => {
  const { register, handleSubmit } = useChatEditForm();

  return (
    <Modal
      title="방생성"
      isOpen={isOpen}
      hasFooter={false}
      handleClose={handleModalClose}
      handleConfirm={handleModalClose}
    >
      <ChatEditForm onSubmit={handleSubmit(handleChatRoomCreate)}>
        <ChatEditInput>
          <ChatEditLabel>제목</ChatEditLabel>
          <Input
            register={register("title")}
            width={18}
            bgColor="gray"
            placeholder="제목을 입력하세요"
          />
        </ChatEditInput>
        <ChatEditInput>
          <ChatEditLabel>설명</ChatEditLabel>
          <Input
            register={register("description")}
            width={18}
            bgColor="gray"
            placeholder="설명을 입력하세요"
          />
        </ChatEditInput>
        <ChatEditInput>
          <ChatEditLabel>최대 인원수</ChatEditLabel>
          <Input
            type="number"
            register={register("maximumMember")}
            width={18}
            bgColor="gray"
            placeholder="최대 인원을 입력해주세요"
            min={2}
            max={5}
          />
        </ChatEditInput>
        <ChatEditButtonContainer>
          <Button
            type="button"
            bgColor="secondary"
            width={4}
            onClick={handleModalClose}
          >
            취소
          </Button>
          <Button type="submit" bgColor="primary" width={4}>
            생성
          </Button>
        </ChatEditButtonContainer>
      </ChatEditForm>
    </Modal>
  );
};

export default ChatEdit;

const ChatEditForm = tw.form`
  flex flex-col w-auto
`;

const ChatEditButtonContainer = tw.div`
  flex justify-end px-8 space-x-4
`;

const ChatEditInput = tw.div`
  flex flex-col w-full p-4
`;

const ChatEditLabel = tw.label``;
