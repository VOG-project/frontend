import tw from "twin.macro";
import useChatEditForm, { ChatEditValue } from "@/hooks/useChatEditForm";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import Button from "@/components/common/Button";
import { createChatRoomRequest } from "@/apis/chat";

interface ChatEditProps {
  isOpen: boolean;
  handleModalClose: () => void;
}

const ChatEdit = ({ isOpen, handleModalClose }: ChatEditProps) => {
  const { register, handleSubmit } = useChatEditForm();
  const handleChatRoomCreate = async (data: ChatEditValue) => {
    const { title, maximumMember } = data;
    const res = await createChatRoomRequest(11, title, maximumMember);

    console.log(res);
  };
  return (
    <Modal
      title="방생성"
      isOpen={isOpen}
      hasFooter={false}
      handleClose={handleModalClose}
      handleConfirm={handleModalClose}
    >
      <ChatEditForm onSubmit={handleSubmit(handleChatRoomCreate)}>
        <Input
          register={register("title")}
          width={18}
          bgColor="gray"
          placeholder="제목을 입력하세요"
        />
        <Input
          type="number"
          register={register("maximumMember")}
          width={18}
          bgColor="gray"
          placeholder="최대 인원을 입력해주세요"
        />
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
