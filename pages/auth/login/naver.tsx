import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import customAxios from "@/utils/customAxios";
import Loading from "@/components/common/Loading";

const NaverLogin = () => {
  interface NaverLoginQuery extends ParsedUrlQuery {
    code: string;
    state: string;
  }

  const router = useRouter();
  const query = router.query as NaverLoginQuery;
  if (query.code && query.state) {
    customAxios()
      .post("/auth/login/naver", {
        code: query.code,
        state: query.state,
      })
      .then((res) => console.log(res));
  }
  return <Loading />;
};

export default NaverLogin;