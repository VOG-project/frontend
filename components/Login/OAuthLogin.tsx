import Link from "next/link";
import Image from "next/image";
import tw from "twin.macro";

const OAuthLogin = () => {
  const NAVER_CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
  const NAVER_CLIENT_STATE = process.env.NEXT_PUBLIC_NAVER_CLIENT_STATE;

  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_STATE = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_STATE;

  const KAKAO_CLIENT_ID = process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID;
  const KAKAO_CLIENT_STATE = process.env.NEXT_PUBLIC_KAKAO_CLIENT_STATE;

  return (
    <OAuthContainer>
      <NaverLogin
        href={`https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${NAVER_CLIENT_STATE}&redirect_uri=https://talkgg.online/auth/login/naver`}
      >
        <LogoIcon
          src={"/image/logo_naver.png"}
          width={200}
          height={200}
          quality={100}
          alt="naver"
        />
        <LoginText>Sign in with Naver</LoginText>
      </NaverLogin>
      <GoogleLogin
        href={`https://accounts.google.com/o/oauth2/v2/auth?scope=https://www.googleapis.com/auth/drive.metadata.readonly&access_type=offline&response_type=code&state=${GOOGLE_CLIENT_STATE}&redirect_uri=https://talkgg.online/auth/login/google&client_id=${GOOGLE_CLIENT_ID}`}
      >
        <LogoIcon
          src={"/image/logo_google.png"}
          width={200}
          height={200}
          quality={100}
          alt="naver"
        />
        <LoginText>Sign in with Google</LoginText>
      </GoogleLogin>
      <KakaoLogin
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=https://talkgg.online/auth/login/kakao&state=${KAKAO_CLIENT_STATE}`}
      >
        <LogoIcon
          src={"/image/logo_google.png"}
          width={200}
          height={200}
          quality={100}
          alt="naver"
        />
        <LoginText>Sign in with Kakao</LoginText>
      </KakaoLogin>
    </OAuthContainer>
  );
};

export default OAuthLogin;

const OAuthContainer = tw.div`
  flex flex-col items-center gap-5 w-full m-auto text-[14px]
`;

const LogoIcon = tw(Image)`
  shrink-0 w-[18px] h-[18px] mr-[8px]
`;

const NaverLogin = tw(Link)`
  flex items-center justify-center w-3/6 h-12 rounded bg-[#03c75a]
`;

const GoogleLogin = tw(Link)`
  flex items-center justify-center w-3/6 h-12 rounded bg-white text-black
`;

const KakaoLogin = tw(Link)`
  flex items-center justify-center w-3/6 h-12 rounded bg-[#FEE500] text-black
`;

const LoginText = tw.span`
  flex items-center justify-center w-32 text-center
`;
