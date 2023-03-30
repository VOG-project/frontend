import { ReactNode } from "react";
import dynamic from "next/dynamic";
import tw from "twin.macro";

const DynamicSidebar = dynamic(() => import("../Sidebar"), {
  ssr: false,
});

const DynamicFriend = dynamic(() => import("../Friend"), {
  ssr: false,
});

const DynamicUserProfileModal = dynamic(() => import("../UserProfileModal"), {
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
      <DynamicFriend />
      <DynamicUserProfileModal />
    </MainLayoutContainer>
  );
};

export default MainLayout;

const MainLayoutContainer = tw.div`
  relative flex w-full h-full max-w-[120rem] m-auto overflow-x-hidden
`;
