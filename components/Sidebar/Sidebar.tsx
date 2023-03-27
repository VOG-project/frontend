import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useRecoilValue } from "recoil";
import tw from "twin.macro";
import useUserState from "@/hooks/useUserState";
import Header from "../common/Header";
import UserCard from "../common/UserCard";
import { getGameLogo } from "@/utils/getGameLogo";
import { getIcons } from "../icons";
import { logoutRequest } from "@/apis/auth";
import { selectedGameState } from "@/recoil/atoms/selectedGameState";
import { NAV_MENU } from "@/constants/nav";

const Sidebar = () => {
  const router = useRouter();
  const game = useRecoilValue(selectedGameState);
  const { resetUser } = useUserState();
  const [gameLogo, setGameLogo] = useState<StaticImageData>();
  useEffect(() => {
    setGameLogo(getGameLogo(game));
  }, [game]);

  const handleVogClick = () => {
    router.push("/");
  };

  const handleLogoClick = () => {
    router.push("/select-game");
  };

  const handleLogout = async () => {
    const res = await logoutRequest();
    if (res.success) {
      resetUser();
      router.push("/");
    }
  };
  return (
    <SidebarContainer>
      <VogLogo onClick={handleVogClick}>
        <Header title="VOG" />
      </VogLogo>
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
        <SidebarItem>
          <Logout onClick={handleLogout}>
            <ItemIcon>{getIcons("exit", 34)}</ItemIcon>
            로그아웃
          </Logout>
        </SidebarItem>
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
  relative border-b border-neutral-700
`;

const VogLogo = tw.div`
  cursor-pointer
`;

const SidebarMenu = tw.ul`
  h-full p-4 font-semibold
`;

const SidebarItem = tw.li`
  w-full my-2
`;

const Logout = tw.div`
  flex items-center
`;

const SidebarLink = tw(Link)`
  flex flex-row items-center w-full
`;

const ItemIcon = tw.div`
  mr-4
`;

const SidebarGameLogo = tw.div`
  flex flex-col justify-end cursor-pointer
`;
