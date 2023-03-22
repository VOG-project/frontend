import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import tw from "twin.macro";
import { useRecoilValue } from "recoil";
import { selectedGameState } from "@/recoil/atoms/selectedGameState";
import Header from "../common/Header";
import UserCard from "../common/UserCard";
import { getGameLogo } from "@/utils/getGameLogo";
import { NAV_MENU } from "@/constants/nav";

const Sidebar = () => {
  const router = useRouter();
  const game = useRecoilValue(selectedGameState);
  const [gameLogo, setGameLogo] = useState<StaticImageData>();
  useEffect(() => {
    setGameLogo(getGameLogo(game));
  }, [game]);

  const handleLogoClick = () => {
    router.push("/select-game");
  };

  return (
    <SidebarContainer>
      <Header title="VOG" />
      <Profile>
        <UserCard />
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
        <SidebarGameLogo onClick={handleLogoClick}>
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

const SidebarGameLogo = tw.div`
  grow flex flex-col justify-end cursor-pointer
`;
