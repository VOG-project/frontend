import { useState, useEffect } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import tw from "twin.macro";
import { useRecoilValue } from "recoil";
import { selectedGameState } from "@/recoil/atoms/selectedGameState";
import Header from "../common/Header";
import UserCard from "../common/UserCard";
import { getGameLogo } from "@/utils/getGameLogo";
import { getIcons } from "../icons";

const NAV_MENU = [
  { name: "채팅", href: "/chat", icon: getIcons("chat", 34) },
  { name: "커뮤니티", href: "/community", icon: getIcons("cardList", 34) },
];

const Sidebar = () => {
  const game = useRecoilValue(selectedGameState);
  const [gameLogo, setGameLogo] = useState<StaticImageData>();
  useEffect(() => {
    setGameLogo(getGameLogo(game));
  }, [game]);

  return (
    <SidebarContainer>
      <Header title="VOG" />
      <Profile>
        <DropdownWrapper>
          <UserCard />
          <DropdwonIcon>{getIcons("down", 24)}</DropdwonIcon>
        </DropdownWrapper>
      </Profile>
      <SidebarMenu>
        {NAV_MENU.map((menu) => {
          const { name, href, icon } = menu;
          return (
            <SidebarItem key={name}>
              <SidebarLink href={href}>
                <ItemIcon>{icon}</ItemIcon>
                {name}
              </SidebarLink>
            </SidebarItem>
          );
        })}
      </SidebarMenu>
      {gameLogo && (
        <SidebarGameLogo>
          <Image src={gameLogo} alt="gameLogo" />
        </SidebarGameLogo>
      )}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = tw.nav`
  fixed flex flex-col w-64 h-full p-4 border-r border-neutral-700 text-xl
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
  p-4 font-semibold
`;

const SidebarItem = tw.li`
  w-full my-2
`;

const SidebarLink = tw(Link)`
  flex flex-row items-center w-full
`;

const ItemIcon = tw.div`
  mr-4
`;

const SidebarGameLogo = tw.div``;
