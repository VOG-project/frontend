import tw from "twin.macro";
import Header from "../common/Header";
import UserCard from "../common/UserCard";
import { getIcons } from "../icons";

const Sidebar = () => {
  return (
    <SidebarContainer>
      <Header>VOG</Header>
      <Profile>
        <DropdownWrapper>
          <UserCard />
          <DropdwonIcon>{getIcons("down", 24)}</DropdwonIcon>
        </DropdownWrapper>
      </Profile>
      <SidebarMenu>
        <SidebarItem>
          <ItemIcon>{getIcons("chat", 30)}</ItemIcon>채팅
        </SidebarItem>
        <SidebarItem>
          <ItemIcon>{getIcons("cardList", 30)}</ItemIcon>커뮤니티
        </SidebarItem>
      </SidebarMenu>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = tw.nav`
  fixed flex flex-col w-64 h-full p-4 border-r border-neutral-700
`;

const Profile = tw.div`
  border-b border-neutral-700
`;

const DropdownWrapper = tw.div`
  relative cursor-pointer
`;

const DropdwonIcon = tw.div`
  absolute align-middle top-5 right-0
`;

const SidebarMenu = tw.ul`
  p-4 text-xl font-semibold
`;

const SidebarItem = tw.li`
  flex w-full my-2
`;

const ItemIcon = tw.div`
  mr-2
`;
