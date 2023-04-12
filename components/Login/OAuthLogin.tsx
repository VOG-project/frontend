import tw from "twin.macro";
import Button from "../common/Button";
import Link from "next/link";

const OAuthLogin = () => {
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const NAVER_CLIENT_STATE = process.env.NEXT_PUBLIC_NAVER_CLIENT_STATE;

  return (
    <OAuthContainer>
      <Button bgColor="secondary" width={18}>
        Google
      </Button>
      <Link
        href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_CLIENT_STATE}&redirect_uri=http://localhost:3000/auth/login/naver`}
      >
        Naver
      </Link>
    </OAuthContainer>
  );
};

export default OAuthLogin;

const OAuthContainer = tw.div`flex flex-col items-center px-10`;
