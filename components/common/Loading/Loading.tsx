import tw from "twin.macro";

const Loading = () => {
  return (
    <LoadingContainer>
      <Cycle></Cycle>
    </LoadingContainer>
  );
};

export default Loading;

const LoadingContainer = tw.div`
  flex items-center justify-center w-full h-full
`;

const Cycle = tw.div`
  h-16 w-16 border-8 border-t-white border-x-white/30 border-b-white/30 rounded-full animate-spin
`;
