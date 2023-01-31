import { ReactNode } from "react";
import tw from "twin.macro";

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <HeaderContainer>
      <HeaderTitle>{children}</HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = tw.header`
  h-16 border-b border-neutral-700
`;

const HeaderTitle = tw.h2``;
