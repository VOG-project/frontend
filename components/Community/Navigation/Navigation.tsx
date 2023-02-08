import Link from "next/link";
import tw from "twin.macro";

const NAV_MENU = [
  { name: "전체", href: "/community" },
  { name: "자유게시판", query: "free" },
  { name: "유머게시판", query: "humor" },
  { name: "대회소식", query: "news" },
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
  w-full border-b border-neutral-700
`;

const NavMenu = tw.div`
  flex items-center gap-12 h-16 ml-4
`;

const NavLink = tw(Link)`
  relative flex items-center h-full align-middle text-3xl font-semibold
  hover:text-primary
  after:(absolute bottom-0
    hover:(w-full border-b-2 border-primary)
    )
`;
