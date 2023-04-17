import { useEffect } from "react";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import Login from "@/components/Login";
import { loginState } from "@/recoil/selectors/loginState";

const LoginPage = () => {
  const router = useRouter();
  const isLogin = useRecoilValue(loginState);

  useEffect(() => {
    if (isLogin) router.push("/");
  }, [isLogin]);

  return <Login />;
};

export default LoginPage;
