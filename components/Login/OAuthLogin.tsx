import Link from "next/link";
import Image from "next/image";
import tw from "twin.macro";
import Button from "../common/Button";

const OAuthLogin = () => {
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const NAVER_CLIENT_STATE = process.env.NEXT_PUBLIC_NAVER_CLIENT_STATE;

  return (
    <OAuthContainer>
      <NaverLogin
        href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_CLIENT_STATE}&redirect_uri=http://localhost:3002/auth/login/naver`}
      >
        <NaverIcon
          src={"/image/naver.png"}
          width={200}
          height={200}
          quality={100}
          alt="naver"
        />
        <NaverText>Log in with Naver</NaverText>
      </NaverLogin>

      <Button bgColor="secondary" width={18}>
        Google
      </Button>
    </OAuthContainer>
  );
};

export default OAuthLogin;

const OAuthContainer = tw.div`
  flex w-full flex-col items-center m-auto
`;

const NaverLogin = tw(Link)`
  flex items-center justify-center w-3/6 h-12 rounded bg-[#03C75A]
`;

const NaverIcon = tw(Image)`
  shrink-0 w-12 h-12
`;

const NaverText = tw.div`
  flex items-center justify-center w-32 text-center
`;
