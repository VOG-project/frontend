import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loginState } from "@/recoil/selectors/loginState";
import SelectGame from "@/components/SelectGame";
import { useEffect } from "react";

const SelectGamePage = () => {
  const isLogin = useRecoilValue(loginState);
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.push("/login");
    }
  }, []);

  return <SelectGame />;
};

export default SelectGamePage;
