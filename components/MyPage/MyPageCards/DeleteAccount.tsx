import { ChangeEvent, useState } from "react";
import tw from "twin.macro";
import useModal from "@/hooks/useModal";
import useToast from "@/hooks/useToast";
import Left from "@/components/common/MyPageCard/Left";
import Right from "@/components/common/MyPageCard/Right";
import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Modal from "@/components/common/Modal";
import { withdrawalRequest } from "@/apis/user";

const DeleteAccount = () => {
  const { isOpen, handleModalClose, handleModalOpen } = useModal();
  const [password, setPassword] = useState("");
  const { toast } = useToast();

  const handlePasswordInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleDeleteAccount = async () => {
    const res = await withdrawalRequest({ userId: 6, password });
    if (res.success) {
      console.log(res);
    } else {
      toast.alert(res.error);
    }
  };

  return (
    <DeleteAccountContainer>
      <Left title="회원탈퇴" />
      <Right>
        <DeleteAccountButton>
          <Button
            type="button"
            bgColor="secondary"
            width={12}
            onClick={handleModalOpen}
          >
            회원탈퇴
          </Button>
        </DeleteAccountButton>
      </Right>
      <Modal
        isOpen={isOpen}
        title="회원탈퇴"
        content="정말로 탈퇴하시겠습까?"
        handleClose={handleModalClose}
        handleConfirm={handleDeleteAccount}
      >
        <Input
          type="password"
          bgColor="gray"
          placeholder="비밀번호를 입력하세요."
          onChange={handlePasswordInputChange}
        ></Input>
      </Modal>
    </DeleteAccountContainer>
  );
};

export default DeleteAccount;

const DeleteAccountContainer = tw.div`
  flex w-full
`;

const DeleteAccountButton = tw.div`
  flex justify-center
`;
