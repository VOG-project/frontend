import { ReactNode } from "react";
import tw from "twin.macro";

interface RightProps {
  children: ReactNode;
}

const Right = ({ children }: RightProps) => {
  return <RightContainer>{children}</RightContainer>;
};

export default Right;

const RightContainer = tw.div`
  w-full p-16 bg-stone-800
`;
