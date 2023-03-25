import { useRouter } from "next/router";
import tw from "twin.macro";
import useSignUpForm from "@/hooks/useSignUpForm";
import { signUpRequest, SignUpRequest } from "@/apis/user";
import Input from "../common/Input";
import Button from "../common/Button";

const SignUp = () => {
  const { register, handleSubmit } = useSignUpForm();
  const router = useRouter();
  const handleSignUp = async ({
    email,
    password,
    nickname,
    sex,
  }: SignUpRequest) => {
    const res = await signUpRequest({
      email,
      password,
      nickname,
      sex,
    });
    if (res.success) {
      router.push("/login");
    }
  };
  return (
    <SignUpWrapper>
      <SignUpContainer>
        <SignUpForm onSubmit={handleSubmit(handleSignUp)}>
          <SignUpTitle>회원가입</SignUpTitle>
          <SignUpInputContainer>
            <Input
              register={register("email")}
              placeholder="이메일"
              bgColor="gray"
            />
          </SignUpInputContainer>
          <SignUpInputContainer>
            <Input
              register={register("nickname")}
              placeholder="닉네임 (2~10자)"
              bgColor="gray"
            />
          </SignUpInputContainer>
          <RadioContainer>
            <Input
              register={register("sex")}
              type="radio"
              value="남"
              width={1.25}
            />
            남자
            <Input
              register={register("sex")}
              type="radio"
              value="여"
              width={1.25}
            />
            여자
          </RadioContainer>
          <SignUpInputContainer>
            <Input
              register={register("password")}
              type="password"
              placeholder="비밀번호 입력"
              bgColor="gray"
            />
          </SignUpInputContainer>
          <SignUpInputContainer>
            <Input
              register={register("confirmPassword")}
              type="password"
              placeholder="비밀번호 재입력"
              bgColor="gray"
            />
          </SignUpInputContainer>
          <SignUpText>
            비밀번호는 8~16자리의 영문 대소문자, 숫자, 특수문자를 조합하여
            설정해 주세요.
          </SignUpText>
          <Button type="submit">회원가입</Button>
        </SignUpForm>
      </SignUpContainer>
    </SignUpWrapper>
  );
};

export default SignUp;

const SignUpWrapper = tw.section`
relative flex items-center justify-center h-full bg-[url("./image/valorant.jpg")] bg-cover
after:(absolute inset-0 bg-black/50)
`;

const SignUpContainer = tw.div`py-10 w-[28rem] rounded drop-shadow bg-black/80 z-10`;

const SignUpForm = tw.form`flex flex-col px-10`;

const SignUpTitle = tw.h2`
  text-3xl font-bold
`;

const SignUpInputContainer = tw.div`relative flex my-4 border-b border-black`;

const RadioContainer = tw.div`flex items-center justify-around m-auto w-40`;

const SignUpText = tw.span`text-xs text-slate-400`;
