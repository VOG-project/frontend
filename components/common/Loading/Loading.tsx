import tw from "twin.macro";
import useLoadingState from "@/hooks/useLoadingState";
import Circle from "./Circle";

const Loading = () => {
  const { isLoading } = useLoadingState();
  return <LoadingContainer>{isLoading && <Circle />}</LoadingContainer>;
};

export default Loading;

const LoadingContainer = tw.div``;
