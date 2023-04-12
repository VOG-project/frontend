import { useRouter } from "next/router";
import tw from "twin.macro";
import useLoginForm from "@/hooks/useLoginForm";
import OAuthLogin from "./OAuthLogin";
import Input from "../common/Input";
import Button from "../common/Button";
import ErrorMessage from "../common/ErrorMessage";

const Login = () => {
  const router = useRouter();
  const { watchEmail, watchPassword, emailError, passwordError, register } =
    useLoginForm();
  const handleSignUpClick = () => {
    router.push("/sign-up");
  };

  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginForm>
          <LoginTitle>VOG 로그인</LoginTitle>
          <LoginInputContainer>
            <Input
              register={register("email")}
              placeholder="이메일"
              height={3}
              bgColor="gray"
            />
            {watchEmail && emailError && (
              <ErrorMessage>유효한 이메일을 입력하세요.</ErrorMessage>
            )}
          </LoginInputContainer>
          <LoginInputContainer>
            <Input
              register={register("password")}
              type="password"
              height={3}
              placeholder="비밀번호"
              bgColor="gray"
            />
            {watchPassword && passwordError && (
              <ErrorMessage>
                비밀번호는 8~15자리의 영문 대소문자, 특수문자, 숫자로
                구성되어야합니다.
              </ErrorMessage>
            )}
          </LoginInputContainer>
        </LoginForm>
        <Or>or</Or>
        <OAuthLogin />
        <SignUpButtonContainer>
          <SignUpText>계정이 없으신가요?</SignUpText>
          <Button width={7.5} bgColor="primary" onClick={handleSignUpClick}>
            회원가입
          </Button>
        </SignUpButtonContainer>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = tw.section`
relative flex items-center justify-center h-full bg-[url("./image/valorant.jpg")] bg-cover
after:(absolute inset-0 bg-black/50)
`;

const LoginContainer = tw.div`py-10 w-[28rem] rounded drop-shadow bg-black/80 z-10`;

const LoginTitle = tw.h2`
  text-3xl font-bold
`;

const LoginInputContainer = tw.div`w-full`;

const LoginForm = tw.form`flex flex-col px-16 gap-4`;

const Or = tw.div`
  relative w-full text-center
  before:(absolute top-3 left-5 w-2/5 h-px bg-white)
  after:(absolute top-3 right-5 w-2/5 h-px bg-white)
`;

const SignUpButtonContainer = tw.div`flex m-auto w-80 items-center justify-around`;

const SignUpText = tw.span`block`;
