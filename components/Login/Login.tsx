import { useEffect } from "react";
import tw from "twin.macro";
import { useRouter } from "next/router";
import useUserState from "@/hooks/useUserState";
import useFriendState from "@/hooks/useFriendState";
import useToast from "@/hooks/useToast";
import OAuthLogin from "./OAuthLogin";
import { deleteAccessToken } from "@/utils/tokenManager";

const Login = () => {
  const router = useRouter();
  const { resetUser } = useUserState();
  const { resetFriend } = useFriendState();
  const { toast } = useToast();
  useEffect(() => {
    if (router.query.authorized) {
      resetUser();
      resetFriend();
      deleteAccessToken();
      toast.alert("다른 컴퓨터에서 로그인 되었습니다.");
    }
  }, []);

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

const LoginContainer = tw.div`
  py-10 px-20 w-[28rem] rounded drop-shadow bg-black/80 z-10
`;

const LoginTitle = tw.h2`
  w-full mb-4 text-3xl font-bold text-center
`;
