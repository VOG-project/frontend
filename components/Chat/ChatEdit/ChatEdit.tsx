import tw from "twin.macro";
import useChatForm from "@/hooks/useChatForm";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import { createChatRoomRequest } from "@/apis/chat";

interface ChatEditProps {
  isOpen: boolean;
  handleModalClose: () => void;
}

const ChatEdit = ({ isOpen, handleModalClose }: ChatEditProps) => {
  const { register, handleSubmit } = useChatForm();
  const handleChatRoomCreate = async (data) => {
    const { title, maximumMember } = data;
    console.log(title, maximumMember);
    const res = await createChatRoomRequest(11, chat.title, chat.maximumMember);

    console.log(res);
  };
  return (
    <Modal
      title="방생성"
      isOpen={isOpen}
      handleClose={handleModalClose}
      handleConfirm={handleModalClose}
    >
      <ChatEditForm>
        <Input
          register={register("title")}
          width={18}
          bgColor="gray"
          placeholder="제목을 입력하세요"
        />
        <Input
          register={register("maximumMember")}
          width={18}
          bgColor="gray"
          placeholder="최대 인원을 입력해주세요"
        />
      </ChatEditForm>
    </Modal>
  );
};

export default ChatEdit;

const ChatEditForm = tw.form`
  flex flex-col w-auto
`;
