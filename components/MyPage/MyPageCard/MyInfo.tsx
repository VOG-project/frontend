import Button from "@/components/common/Button";
import { useState } from "react";
import tw, { styled } from "twin.macro";

const MyInfo = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <MyInfoContainer>
      <MyInfoMenu>
        <MyInfoTitle>정보 관리</MyInfoTitle>
        <MyInfoList>
          <MyInfoListItem onClick={() => setIsOpen((prev) => !prev)}>
            비밀번호 변경
          </MyInfoListItem>
          <MyInfoListItem>프로필 이미지 변경</MyInfoListItem>
          <MyInfoListItem>닉네임 변경</MyInfoListItem>
          <MyInfoListItem>탈퇴</MyInfoListItem>
        </MyInfoList>
      </MyInfoMenu>
      <MyInfoContentContainer isOpen={isOpen}>
        <MyInfoContent>
          <CloseButton
            position={{ type: "absolute", top: "0.5rem", left: "2rem" }}
            width={2.5}
            onClick={() => setIsOpen(false)}
          >
            x
          </CloseButton>
        </MyInfoContent>
      </MyInfoContentContainer>
    </MyInfoContainer>
  );
};

export default MyInfo;

const MyInfoContainer = tw.section`
  absolute right-0 flex w-1/3 h-full border-l border-neutral-700
`;

const MyInfoMenu = tw.div`
  w-full h-full p-8 text-center
`;

const MyInfoTitle = tw.h2`
  p-6 border-b border-white text-3xl
`;

const MyInfoList = tw.ul`
  mt-20 divide-y-[2rem] divide-transparent text-xl
`;

const MyInfoListItem = tw.li``;

const MyInfoContentContainer = styled.div<{ isOpen: boolean }>(({ isOpen }) => [
  tw`absolute hidden w-[200%] h-full right-full overflow-hidden z-10`,
  isOpen && tw`block`,
]);

const MyInfoContent = tw.div`
  w-full h-full bg-black
  animate-[slideLeft_0.5s]
`;

const CloseButton = tw(Button)``;
