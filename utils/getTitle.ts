import { COMMUNITY_NAV_MENU } from "@/constants/nav";

export const getTitle = (category: string) => {
  const title = COMMUNITY_NAV_MENU.find((item) => item.query === category);
  if (title) {
    return title.name;
  } else return "";
};
