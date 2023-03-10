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
        <HistoryList>
          <HistoryListItem onClick={handleHistoryListClick}>
            내가 작성한 글
          </HistoryListItem>
          <HistoryListItem onClick={handleHistoryListClick}>
            내가 작성한 댓글
          </HistoryListItem>
          <HistoryListItem onClick={handleHistoryListClick}>
            참여한 채팅 목록
          </HistoryListItem>
          <HistoryListItem onClick={handleHistoryListClick}>
            채팅 내역
          </HistoryListItem>
        </HistoryList>
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

const HistoryMenu = tw.div`
  w-full h-full py-6 px-10 text-center
`;

const HistoryTitle = tw.h2`
  py-6 border-b border-white text-3xl
`;

const HistoryList = tw.ul`
  w-1/2 mx-auto mt-20 text-xl list-disc
`;

const HistoryListItem = tw.li`
  mt-8 cursor-pointer
`;

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
