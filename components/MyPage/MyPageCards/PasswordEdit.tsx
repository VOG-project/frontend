import tw from "twin.macro";
import usePasswordEditForm from "@/hooks/usePasswordEditForm";
import useToast from "@/hooks/useToast";
import Left from "@/components/common/MyPageCard/Left";
import Right from "@/components/common/MyPageCard/Right";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import { PasswordEditValue } from "@/types/myPage";
import { changePasswordRequest } from "@/apis/user";

const PasswordEdit = () => {
  const { toast } = useToast();
  const {
    watchPassword,
    watchConfirmPassword,
    watchCurrentPassword,
    passwordError,
    confirmPasswordError,
    currentPasswordError,
    isDirty,
    isValid,
    register,
    handleSubmit,
  } = usePasswordEditForm();

  const handlePasswordEditSubmit = async (data: PasswordEditValue) => {
    const { currentPassword, password } = data;
    const res = await changePasswordRequest({
      userId: 6,
      currentPassword,
      newPassword: password,
    });
    console.log(res);
    if (res.success) {
      console.log(res);
    } else {
      toast.alert(res.error);
    }
  };

  return (
    <PasswordEditContainer>
      <Left
        title="비밀번호 변경"
        description="비밀번호 변경 후 로그아웃 됩니다."
      />
      <Right>
        <PasswordEditForm onSubmit={handleSubmit(handlePasswordEditSubmit)}>
          <PasswordEditInput>
            <PasswordEditLabel>
              현재 비밀번호
              <Input
                type="password"
                height={3}
                bgColor={"gray"}
                register={register("currentPassword")}
              />
            </PasswordEditLabel>
            {watchCurrentPassword && currentPasswordError && (
              <ErrorMessage>유효한 비밀번호를 입력하세요.</ErrorMessage>
            )}
          </PasswordEditInput>
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
            {watchPassword && passwordError && (
              <ErrorMessage>유효한 비밀번호를 입력하세요.</ErrorMessage>
            )}
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
            {watchConfirmPassword && confirmPasswordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </PasswordEditInput>
          <PasswordEditSubmitButton>
            <Button
              type="submit"
              width={8}
              bgColor="primary"
              disabled={!isDirty || !isValid}
            >
              변경하기
            </Button>
          </PasswordEditSubmitButton>
        </PasswordEditForm>
      </Right>
    </PasswordEditContainer>
  );
};

export default PasswordEdit;

const PasswordEditContainer = tw.div`
  flex w-full
`;

const PasswordEditForm = tw.form``;

const PasswordEditInput = tw.div``;

const PasswordEditLabel = tw.label``;

const PasswordEditSubmitButton = tw.div`
  float-right
`;
