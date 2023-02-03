import { ReactNode } from "react";
import tw, { styled } from "twin.macro";

interface HeaderProps {
  singleMode: boolean;
  title: string;
  children: ReactNode;
}

const Header = ({ singleMode = true, title, children }: HeaderProps) => {
  return (
    <HeaderContainer mode={singleMode}>
      <HeaderTitle>{title}</HeaderTitle>
      {!singleMode && children}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header<{ mode: boolean }>(({ mode }) => [
  mode
    ? tw`h-16 border-b border-neutral-700`
    : tw`flex justify-between items-center w-full h-20`,
]);

const HeaderTitle = tw.h2`
  text-4xl font-semibold
`;
