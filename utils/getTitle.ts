import { NAV_MENU } from "@/components/Community/Navigation/Navigation";

export const getTitle = (category: string) => {
  const title = NAV_MENU.find((item) => item.href === category);
  if (title) {
    return title.name;
  } else return "전체";
};
