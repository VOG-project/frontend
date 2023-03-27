import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { loginState } from "@/recoil/selectors/loginState";

const hasAuth =
  (Component: React.FC | NextPage): React.FC =>
  <T extends {}>(props: T) => {
    const isLogin = useRecoilValue(loginState);
    const router = useRouter();
    useEffect(() => {
      if (!isLogin) {
        router.push("/login");
      }
    });
    return <Component {...props} />;
  };

export default hasAuth;
