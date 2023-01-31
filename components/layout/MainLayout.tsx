import { ReactNode } from "react";
import tw from "twin.macro";
import Sidebar from "../Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <MainLayoutContainer>
      <Sidebar />
      {children}
    </MainLayoutContainer>
  );
};

export default MainLayout;

const MainLayoutContainer = tw.div`
  flex w-full h-full
`;
