import tw from "twin.macro";
import usePasswordEditForm from "@/hooks/usePasswordEditForm";
import Left from "@/components/common/MyPageCard/Left";
import Right from "@/components/common/MyPageCard/Right";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

const PasswordEdit = () => {
  const { register } = usePasswordEditForm();
  return (
    <PasswordEditContainer>
      <Left
        title="비밀번호 변경"
        description="비밀번호 변경 후 로그아웃 됩니다."
      />
      <Right>
        <PasswordEditInput>
          <PasswordEditLabel>
            새 비밀번호
            <Input
              type="password"
              height={3}
              bgColor={"gray"}
              register={register("password")}
            />
          </PasswordEditLabel>
        </PasswordEditInput>
        <PasswordEditInput>
          <PasswordEditLabel>
            새 비밀번호 확인
            <Input
              type="password"
              height={3}
              bgColor={"gray"}
              register={register("confirmPassword")}
            />
          </PasswordEditLabel>
        </PasswordEditInput>
        <PasswordEditSubmitButton>
          <Button width={8}>변경하기</Button>
        </PasswordEditSubmitButton>
      </Right>
    </PasswordEditContainer>
  );
};

export default PasswordEdit;

const PasswordEditContainer = tw.div`
  flex w-full
`;

const PasswordEditInput = tw.div``;

const PasswordEditLabel = tw.label``;

const PasswordEditSubmitButton = tw.div`
  float-right
`;
