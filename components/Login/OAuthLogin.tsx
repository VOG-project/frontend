import tw from "twin.macro";
import Button from "../common/Button";

const OAuthLogin = () => {
  return (
    <OAuthContainer>
      <Button>Google</Button>
      <Button>Naver</Button>
    </OAuthContainer>
  );
};

export default OAuthLogin;

const OAuthContainer = tw.div`flex flex-col px-10`;
