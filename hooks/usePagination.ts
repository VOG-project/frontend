import { Dispatch, SetStateAction } from "react";

interface usePaginationProps {
  totalPage: number;
  pageRange: number;
  curPage: number;
  setCurPage: Dispatch<SetStateAction<number>>;
}

const usePagination = ({
  totalPage,
  pageRange,
  curPage,
  setCurPage,
}: usePaginationProps) => {
  const firstPageNumber = Math.ceil(curPage / pageRange - 1) * pageRange + 1;

  const pageList = Array(pageRange)
    .fill(0)
    .map((_, index) => {
      return firstPageNumber + index <= totalPage
        ? firstPageNumber + index
        : null;
    })
    .filter((page): page is number => typeof page === "number");

  const handlePrevPageClick = () => {
    setCurPage((prev) => {
      return prev === 1 ? prev : prev - 1;
    });
  };

  const handleNextPageClick = () => {
    setCurPage((prev) => {
      return prev === totalPage ? prev : prev + 1;
    });
  };

  const handlePageClick = (page: number) => {
    setCurPage(page);
  };

  return {
    pageList,
    handleNextPageClick,
    handlePrevPageClick,
    handlePageClick,
  };
};

export default usePagination;
