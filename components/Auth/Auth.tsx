import { useEffect } from "react";
import { useRouter } from "next/router";
import useUserState from "@/hooks/useUserState";
import useToast from "@/hooks/useToast";
import Loading from "@/components/common/Loading";
import { oauthLoginRequest } from "@/apis/auth";
import { AuthQuery } from "@/types/auth";
import { setAccessToken } from "@/utils/tokenManager";

const Auth = () => {
  const router = useRouter();
  const { setUser } = useUserState();
  const { toast } = useToast();
  useEffect(() => {
    const query = router.query as AuthQuery;
    if (query.code && query.state) {
      (async () => {
        const code = query.code;
        const state = query.state;
        const provider = query.provider;
        const res = await oauthLoginRequest(code, state, provider);

        if (res.success) {
          const result = res.result;
          const oauthId = result.oauthId;
          const id = result.id;
          const nickname = result.nickname;
          const profileUrl = result.profileUrl;
          const sex = result.sex;
          const accessToken = result.jwtAccessToken;
          setAccessToken(accessToken);
          setUser((prev) => {
            return { ...prev, oauthId: oauthId, provider: provider };
          });
          if (result.redirectUrl) {
            const redirectUrl = result.redirectUrl;
            router.replace(redirectUrl);
          }
          setUser((prev) => {
            return {
              ...prev,
              id: id,
              nickname: nickname,
              profileUrl: profileUrl,
              sex: sex,
            };
          });
          router.replace("/");
        } else {
          toast.alert(res.error);
        }
      })();
    }
  }, [router]);

  return <Loading />;
};

export default Auth;
