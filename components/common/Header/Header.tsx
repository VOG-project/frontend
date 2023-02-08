import { ReactNode, useState, useEffect } from "react";
import tw, { styled } from "twin.macro";

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

const Header = ({ title, children }: HeaderProps) => {
  const [hasChildren, setHasChildren] = useState(false);
  useEffect(() => {
    if (children) setHasChildren(true);
  }, [children]);
  return (
    <HeaderContainer hasChildren={hasChildren}>
      <HeaderTitle>{title}</HeaderTitle>
      {hasChildren && children}
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header<{ hasChildren: boolean }>(
  ({ hasChildren }) => [
    hasChildren
      ? tw`flex justify-between items-center w-full h-20`
      : tw`h-16 border-b border-neutral-700`,
  ]
);

const HeaderTitle = tw.h2`
  text-4xl font-semibold
`;
