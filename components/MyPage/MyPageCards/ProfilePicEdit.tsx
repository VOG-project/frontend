import { useRef } from "react";
import tw from "twin.macro";
import Left from "@/components/common/MyPageCard/Left";
import Right from "@/components/common/MyPageCard/Right";
import Button from "@/components/common/Button";
import { getIcons } from "@/components/icons";

const ProfilePicEdit = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handlePicButtonClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };
  return (
    <ProfilePicEditContainer>
      <Left title="프로필이미지 변경" />
      <Right>
        <ProfilePicInput type={"file"} ref={inputRef}></ProfilePicInput>
        <ProfilePicButton onClick={handlePicButtonClick}>
          {getIcons("plus", 64)}
        </ProfilePicButton>
        <ProfilePicSumbitButton>
          <Button width={8}>변경하기</Button>
        </ProfilePicSumbitButton>
      </Right>
    </ProfilePicEditContainer>
  );
};

export default ProfilePicEdit;

const ProfilePicEditContainer = tw.div`
  flex w-full
`;

const ProfilePicInput = tw.input`
  hidden
`;

const ProfilePicButton = tw.button`
  flex items-center justify-center w-32 h-32 m-auto rounded-full bg-stone-700
  hover:bg-stone-600
`;

const ProfilePicSumbitButton = tw.div`
  float-right
`;
