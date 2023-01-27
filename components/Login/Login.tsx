import tw from "twin.macro";
import useLoginForm from "@/hooks/useLoginForm";
import OAuthLogin from "./OAuthLogin";
import Input from "../common/Input";
import Button from "../common/Button";

const Login = () => {
  const { register } = useLoginForm();
  return (
    <LoginWrapper>
      <LoginContainer>
        <h1>VOG</h1>
        <LoginForm>
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
          <Button>회원가입</Button>
        </SignUpButtonContainer>
      </LoginContainer>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = tw.section`
relative flex items-center justify-center h-screen text-black bg-[url("./image/valorant.jpg")]
after:absolute after:inset-0 after:bg-black after:opacity-20
`;

const LoginContainer = tw.div`py-4 w-96 bg-white/80 z-10`;

const LoginForm = tw.form`flex flex-col px-10`;

const InputContainer = tw.div`relative flex flex-col my-4 border-b border-black`;

const Or = tw.div`
  relative w-full text-center
  before:absolute before:top-3 before:left-5 before:w-2/5 before:h-px before:bg-black
  after:absolute after:top-3 after:right-5 after:w-2/5 after:h-px after:bg-black
`;

const SignUpButtonContainer = tw.div`flex items-center justify-center`;

const SignUpText = tw.span`block`;
