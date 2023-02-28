import { useRouter } from "next/router";
import tw from "twin.macro";
import useLoginForm from "@/hooks/useLoginForm";
import { loginRequest, LoginRequest } from "@/apis/auth";
import { setSessionStorage } from "@/utils/sessionStorage";
import { AUTH_KEY } from "@/constants/Auth";
import OAuthLogin from "./OAuthLogin";
import Input from "../common/Input";
import Button from "../common/Button";

const Login = () => {
  const router = useRouter();
  const { register, handleSubmit } = useLoginForm();
  const handleSignUpClick = () => {
    router.push("/sign-up");
  };
  const handleLogin = async ({ email, password }: LoginRequest) => {
    const res = await loginRequest({ email, password });
    if (res.success) {
      setSessionStorage(AUTH_KEY, res.result);
      router.push("/select-game");
    } else {
      console.log(res.error);
    }
  };
  return (
    <LoginWrapper>
      <LoginContainer>
        <h1>VOG</h1>
        <LoginForm onSubmit={handleSubmit(handleLogin)}>
          <InputContainer>
            <Input register={register("email")} placeholder="이메일" />
          </InputContainer>
          <InputContainer>
            <Input
              register={register("password")}
              type="password"
              placeholder="비밀번호"
            />
          </InputContainer>
          <Button type="submit">로그인</Button>
        </LoginForm>
        <Or>or</Or>
        <OAuthLogin />
        <SignUpButtonContainer>
          <SignUpText>계정이 없으신가요?</SignUpText>
          <Button width={7.5} onClick={handleSignUpClick}>
            회원가입
          </Button>
        </SignUpButtonContainer>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = tw.section`
relative flex items-center justify-center h-full text-black bg-[url("./image/valorant.jpg")] bg-cover
after:(absolute inset-0 bg-black opacity-20)
`;

const LoginContainer = tw.div`py-4 w-96 rounded drop-shadow bg-white z-10`;

const LoginForm = tw.form`flex flex-col px-10`;

const InputContainer = tw.div`relative flex flex-col my-4 border-b border-black`;

const Or = tw.div`
  relative w-full text-center
  before:(absolute top-3 left-5 w-2/5 h-px bg-black)
  after:(absolute top-3 right-5 w-2/5 h-px bg-black)
`;

const SignUpButtonContainer = tw.div`flex m-auto w-80 items-center justify-around`;

const SignUpText = tw.span`block`;
