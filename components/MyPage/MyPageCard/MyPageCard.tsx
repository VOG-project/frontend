import tw from "twin.macro";
import MyInfo from "./MyInfo";

const MyPageCard = () => {
  return (
    <MyPageCardContainer>
      <MyInfo />
      <MyProfile>망냉</MyProfile>
    </MyPageCardContainer>
  );
};

export default MyPageCard;

const MyPageCardContainer = tw.div`
  relative flex justify-center w-11/12 h-5/6 border border-neutral-600 overflow-hidden
`;

const MyProfile = tw.div`
  flex flex-col w-2/3 h-full
`;
