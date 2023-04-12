import tw from "twin.macro";
import Button from "../common/Button";

const OAuthLogin = () => {
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const NAVER_CLIENT_SECRET = process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET;
  return (
    <OAuthContainer>
      <Button bgColor="secondary" width={18}>
        Google
      </Button>
      <a
        href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_CLIENT_SECRET}&redirect_uri=http://localhost:3000/auth/login/naver`}
      >
        Naver
      </a>
    </OAuthContainer>
  );
};

export default OAuthLogin;

const OAuthContainer = tw.div`flex flex-col items-center px-10`;
