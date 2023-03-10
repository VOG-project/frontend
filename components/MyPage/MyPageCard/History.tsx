import { useState } from "react";
import tw, { styled } from "twin.macro";
import Button from "@/components/common/Button";

const History = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleHistoryListClick = () => {
    setIsOpen(true);
  };
  return (
    <HistoryContainer>
      <HistoryMenu>
        <HistoryTitle>활동 내역</HistoryTitle>
        <HistoryList onClick={handleHistoryListClick}>
          내가 작성한 글
        </HistoryList>
        <HistoryList onClick={handleHistoryListClick}>
          내가 작성한 댓글
        </HistoryList>
        <HistoryList onClick={handleHistoryListClick}>
          참여한 채팅 목록
        </HistoryList>
        <HistoryList onClick={handleHistoryListClick}>채팅 내역</HistoryList>
      </HistoryMenu>
      <HistoryContentContainer isOpen={isOpen}>
        <HistoryContent>
          Test
          <CloseButton
            position={{ type: "absolute", top: "0.5rem", right: "2rem" }}
            width={2.5}
            onClick={() => setIsOpen(false)}
          >
            x
          </CloseButton>
        </HistoryContent>
      </HistoryContentContainer>
    </HistoryContainer>
  );
};

export default History;

const HistoryContainer = tw.section`
  absolute flex left-0 w-1/3 h-full border-r border-neutral-700
`;

const HistoryMenu = tw.ul`
  w-full h-full text-center
`;

const HistoryList = tw.li``;

const HistoryTitle = tw.h2``;

const HistoryContentContainer = styled.div<{ isOpen: boolean }>(
  ({ isOpen }) => [
    tw`absolute hidden w-[200%] h-full left-full overflow-hidden z-10`,
    isOpen && tw`block`,
  ]
);

const HistoryContent = tw.div`
  relative w-full h-full bg-black
  animate-[slideRight_0.5s]
`;

const CloseButton = tw(Button)`
`;
