import tw from "twin.macro";
import Button from "../common/Button";

const OAuthLogin = () => {
  return (
    <OAuthContainer>
      <Button bgColor="secondary" width={18}>
        Google
      </Button>
      <Button bgColor="secondary" width={18}>
        Naver
      </Button>
    </OAuthContainer>
  );
};

export default OAuthLogin;

const OAuthContainer = tw.div`flex flex-col items-center px-10`;
