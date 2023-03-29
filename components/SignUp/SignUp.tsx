import { useRouter } from "next/router";
import tw from "twin.macro";
import useSignUpForm from "@/hooks/useSignUpForm";
import useToast from "@/hooks/useToast";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";
import { signUpRequest } from "@/apis/user";
import { SignUpValue } from "@/types/auth";

const SignUp = () => {
  const {
    watchEmail,
    watchNickname,
    watchPassword,
    watchConfirmPassword,
    emailError,
    nicknameError,
    passwordError,
    confirmPasswordError,
    register,
    handleSubmit,
  } = useSignUpForm();
  const { toast } = useToast();
  const router = useRouter();
  const handleSignUp = async ({
    email,
    password,
    nickname,
    gender,
  }: SignUpValue) => {
    const res = await signUpRequest(email, password, nickname, gender);
    if (res.success) {
      router.push("/login");
    } else {
      toast.alert(res.error);
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
              height={3}
              bgColor="gray"
            />
            {watchEmail && emailError && (
              <ErrorMessage>유효한 이메일을 입력하세요.</ErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <Input
              register={register("nickname")}
              placeholder="닉네임 (2~10자)"
              height={3}
              bgColor="gray"
            />
            {watchNickname && nicknameError && (
              <ErrorMessage>닉네임은 2~10자 사이로 적어주세요.</ErrorMessage>
            )}
          </SignUpInputContainer>
          <RadioContainer>
            <Input
              register={register("gender")}
              type="radio"
              value="남"
              width={1.25}
            />
            남자
            <Input
              register={register("gender")}
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
              height={3}
              bgColor="gray"
            />
            {watchPassword && passwordError && (
              <ErrorMessage>유효한 비밀번호를 입력하세요.</ErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpInputContainer>
            <Input
              register={register("confirmPassword")}
              type="password"
              placeholder="비밀번호 재입력"
              height={3}
              bgColor="gray"
            />
            {watchConfirmPassword && confirmPasswordError && (
              <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>
            )}
          </SignUpInputContainer>
          <SignUpText>
            비밀번호는 8~16자리의 영문 대소문자, 숫자, 특수문자를 조합하여
            설정해 주세요.
          </SignUpText>
          <Button type="submit" bgColor="secondary">
            회원가입
          </Button>
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

const SignUpForm = tw.form`flex flex-col px-16`;

const SignUpTitle = tw.h2`
  text-3xl font-bold
`;

const SignUpInputContainer = tw.div`relative flex flex-col my-4 border-b border-black`;

const RadioContainer = tw.div`flex items-center justify-around m-auto w-40`;

const SignUpText = tw.span`text-xs text-slate-400`;
