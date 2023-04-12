import tw from "twin.macro";
import OAuthLogin from "./OAuthLogin";

const Login = () => {
  return (
    <LoginWrapper>
      <LoginContainer>
        <LoginTitle>VOG 로그인</LoginTitle>
        <OAuthLogin />
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
  w-full mb-4 text-3xl font-bold text-center
`;
