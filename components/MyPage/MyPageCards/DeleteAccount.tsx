import tw from "twin.macro";
import Left from "@/components/common/MyPageCard/Left";
import Right from "@/components/common/MyPageCard/Right";
import Button from "@/components/common/Button";
import { DeleteAccountProps } from "@/types/myPage";

const DeleteAccount = ({ handleModalOpen }: DeleteAccountProps) => {
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
