import tw from "twin.macro";

const Circle = () => {
  return (
    <CircleContainer>
      <SpinCircle />
    </CircleContainer>
  );
};

export default Circle;

const CircleContainer = tw.div`
  fixed flex items-center justify-center w-full h-full inset-0  bg-black/50 z-50
`;

const SpinCircle = tw.div`
  h-16 w-16 border-8 border-t-white border-x-white/30 border-b-white/30 rounded-full animate-spin
`;
