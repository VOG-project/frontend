import Link from "next/link";
import tw from "twin.macro";

const NAV_MENU = [
  { name: "전체", href: "/community" },
  { name: "자유게시판", query: "free" },
  { name: "유머게시판", query: "humor" },
  { name: "대회소식", query: "dd" },
];

const Nav = () => {
  return (
    <NavConatiner>
      <NavMenu>
        {NAV_MENU.map((menu) => {
          const { name, href, query } = menu;
          return (
            <NavLink
              key={name}
              href={
                href
                  ? { pathname: href }
                  : {
                      query: { mode: query },
                    }
              }
            >
              {name}
            </NavLink>
          );
        })}
      </NavMenu>
    </NavConatiner>
  );
};

export default Nav;

const NavConatiner = tw.nav`
  w-full
`;

const NavMenu = tw.div`
  flex items-center gap-8 h-16 border-b border-neutral-700
`;

const NavLink = tw(Link)`
  text-3xl font-semibold
  hover:text-primary
`;
