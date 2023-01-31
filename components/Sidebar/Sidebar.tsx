import tw from "twin.macro";
import Header from "../common/Header";
import { getIcons } from "../icons";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Header>VOG</Header>
      <SidebarItem>{getIcons("chat", 24)}채팅</SidebarItem>
      <SidebarItem>{getIcons("cardList", 24)}커뮤니티</SidebarItem>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = tw.nav`
  fixed flex flex-col w-64 h-full p-4 border-r border-neutral-700
`;

const SidebarItem = tw.div`
  flex w-full
`;
