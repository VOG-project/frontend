import tw from "twin.macro";
import useNicknameEditForm from "@/hooks/useNicknameEditForm";
import Left from "@/components/common/MyPageCard/Left";
import Right from "@/components/common/MyPageCard/Right";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import { NicknameEditProps } from "@/types/myPage";

const NicknameEdit = ({ handleNicknameEditSubmit }: NicknameEditProps) => {
  const { errorsNickname, isDirty, isValid, register, handleSubmit } =
    useNicknameEditForm();

  return (
    <NicknameEditContainer>
      <Left title="닉네임 변경" />
      <Right>
        <NicknameEditForm onSubmit={handleSubmit(handleNicknameEditSubmit)}>
          <NicknameEditInput>
            <NicknameEditLabel>
              새 닉네임
              <Input
                height={3}
                bgColor={"gray"}
                register={register("nickname")}
              />
            </NicknameEditLabel>
            {isDirty && errorsNickname && (
              <ErrorMessage>
                닉네임은 2글자 이상 10글자이하로 작성해주세요.
              </ErrorMessage>
            )}
          </NicknameEditInput>
          <NicknameEditSumbit>
            <Button
              type="submit"
              width={8}
              bgColor="primary"
              disabled={!isDirty || !isValid}
            >
              변경하기
            </Button>
          </NicknameEditSumbit>
        </NicknameEditForm>
      </Right>
    </NicknameEditContainer>
  );
};

export default NicknameEdit;

const NicknameEditContainer = tw.div`
  flex w-full
`;

const NicknameEditForm = tw.form``;

const NicknameEditInput = tw.div`
  m-auto
`;

const NicknameEditLabel = tw.label`
`;

const NicknameEditSumbit = tw.div`
  float-right
`;
