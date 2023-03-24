import { useState } from "react";
import tw, { styled } from "twin.macro";
import usePagination from "@/hooks/usePagination";
import { getIcons } from "../icons";

interface PaginationProps {
  count: number;
}

const Pagination = ({ count }: PaginationProps) => {
  const [curPage, setCurPage] = useState(1);
  const {
    pageList,
    handleNextPageClick,
    handlePrevPageClick,
    handlePageClick,
  } = usePagination({
    totalPage: Math.ceil(count / 10),
    pageRange: 10,
    curPage,
    setCurPage,
  });
  return (
    <PaginationContainer>
      <PrevPage onClick={handlePrevPageClick}>{getIcons("left", 20)}</PrevPage>
      {pageList.map((page, index) => {
        return (
          <PageButton
            key={index}
            isActive={curPage === page}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PageButton>
        );
      })}
      <NextPage onClick={handleNextPageClick}>{getIcons("right", 20)}</NextPage>
    </PaginationContainer>
  );
};

export default Pagination;

const PaginationContainer = tw.div`
  flex items-center justify-center w-full h-12
`;

const PageButton = styled.button<{ isActive: boolean }>(({ isActive }) => [
  tw`w-6 h-6 mx-2 font-bold`,
  isActive && tw`text-secondary`,
]);

const PrevPage = tw.button`
  flex items-center justify-center w-6 h-6 border border-primary text-primary
`;

const NextPage = tw.button`
  flex items-center justify-center w-6 h-6 border border-primary text-primary
`;
