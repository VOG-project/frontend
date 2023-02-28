import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { getSessionStorage } from "@/utils/sessionStorage";
import { AUTH_KEY } from "@/constants/Auth";

const hasAuth =
  (Component: React.FC | NextPage): React.FC =>
  <T extends {}>(props: T) => {
    const router = useRouter();
    useEffect(() => {
      if (!getSessionStorage(AUTH_KEY)) {
        router.push("/login");
      }
    });
    return <Component {...props} />;
  };

export default hasAuth;
