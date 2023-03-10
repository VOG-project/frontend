import Link from "next/link";
import tw, { styled } from "twin.macro";
import { COMMUNITY_NAV_MENU } from "@/constants/nav";

interface NavigationProps {
  category: string;
}

const Navigation = ({ category }: NavigationProps) => {
  return (
    <NavConatiner>
      <NavMenu>
        {COMMUNITY_NAV_MENU.map((menu) => {
          const { name, href } = menu;
          return (
            <NavLink key={name} isActive={category === href}>
              <Link href={`/community/${href}`}>{name}</Link>
            </NavLink>
          );
        })}
      </NavMenu>
    </NavConatiner>
  );
};

export default Navigation;

const NavConatiner = tw.nav`
  w-full border-b border-neutral-700
`;

const NavMenu = tw.div`
  flex items-center gap-12 h-16 ml-4
`;

const NavLink = styled.div<{ isActive: boolean }>(({ isActive }) => [
  tw`
  relative flex items-center h-full align-middle text-3xl font-semibold
  hover:text-primary
  after:(absolute bottom-0
    hover:(w-full border-b-2 border-primary)
    )
`,
  isActive && tw`text-primary`,
]);
