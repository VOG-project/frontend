import tw from "twin.macro";
import useNicknameEditForm from "@/hooks/useNicknameEditForm";
import Left from "@/components/common/MyPageCard/Left";
import Right from "@/components/common/MyPageCard/Right";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

const NicknameEdit = () => {
  const { register } = useNicknameEditForm();
  return (
    <NicknameEditContainer>
      <Left
        title="닉네임 변경"
        description="닉네임을 2글자 이상 8글자 이하로 설정해주세요"
      />
      <Right>
        <NicknameEditInput>
          <NicknameEditLabel>
            새 닉네임
            <Input
              height={4}
              bgColor={"gray"}
              register={register("nickname")}
            />
          </NicknameEditLabel>
        </NicknameEditInput>
        <NicknameEditSumbit>
          <Button width={8}>변경하기</Button>
        </NicknameEditSumbit>
      </Right>
    </NicknameEditContainer>
  );
};

export default NicknameEdit;

const NicknameEditContainer = tw.div`
  flex w-full
`;

const NicknameEditInput = tw.div`
  m-auto
`;

const NicknameEditLabel = tw.label`
`;

const NicknameEditSumbit = tw.div`
  float-right
`;
