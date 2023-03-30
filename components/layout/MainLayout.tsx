import { ReactNode } from "react";
import dynamic from "next/dynamic";
import tw from "twin.macro";
import Friend from "../Friend";

const DynamicSidebar = dynamic(() => import("../Sidebar"), {
  ssr: false,
});

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <MainLayoutContainer>
      <DynamicSidebar />
      {children}
      <Friend />
    </MainLayoutContainer>
  );
};

export default MainLayout;

const MainLayoutContainer = tw.div`
  relative flex w-full h-full max-w-[120rem] m-auto overflow-x-hidden
`;
