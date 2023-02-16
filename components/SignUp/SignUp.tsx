import tw from "twin.macro";
import useSignUpForm from "@/hooks/useSignUpForm";
import Input from "../common/Input";
import Button from "../common/Button";

const SignUp = () => {
  const { register } = useSignUpForm();
  return (
    <SignUpWrapper>
      <SignUpContainer>
        <h1>회원가입</h1>
        <SignUpForm>
          <InputContainer>
            <Input register={register("email")} placeholder="이메일" />
          </InputContainer>
          <InputContainer>
            <Input
              register={register("nickname")}
              placeholder="닉네임 (2~10자)"
            />
          </InputContainer>
          <InputContainer>
            <Input
              register={register("password")}
              type="password"
              placeholder="비밀번호 입력"
            />
          </InputContainer>
          <InputContainer>
            <Input
              register={register("confirmPassword")}
              type="password"
              placeholder="비밀번호 재입력"
            />
          </InputContainer>
          <SignUpText>
            비밀번호는 8~16자리의 영문 소문자, 숫자, 특수문자를 조합하여 설정해
            주세요.
          </SignUpText>
          <Button type="submit">회원가입</Button>
        </SignUpForm>
      </SignUpContainer>
    </SignUpWrapper>
  );
};

export default SignUp;

const SignUpWrapper = tw.section`
relative flex items-center justify-center h-full text-black bg-[url("./image/valorant.jpg")] bg-cover
after:absolute after:inset-0 after:bg-black after:opacity-20
`;

const SignUpContainer = tw.div`py-4 w-96 rounded drop-shadow bg-white z-10`;

const SignUpForm = tw.form`flex flex-col px-10`;

const InputContainer = tw.div`relative flex flex-col my-4 border-b border-black`;

const SignUpText = tw.span`text-xs text-slate-400`;
