import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loginState } from "@/recoil/selectors/loginState";
import Home from "@/components/Home";
import { useEffect } from "react";

const HomePage = () => {
  const isLogin = useRecoilValue(loginState);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, []);

  return <Home />;
};

export default HomePage;
