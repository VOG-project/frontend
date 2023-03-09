import { getIcons } from "@/components/icons";

export const COMMUNITY_NAV_MENU = [
  { name: "전체", href: "" },
  { name: "자유게시판", href: "free" },
  { name: "유머게시판", href: "humor" },
  { name: "대회소식", href: "championship" },
];

export const NAV_MENU = [
  { name: "채팅", href: "/chat", icon: getIcons("chat", 34) },
  { name: "커뮤니티", href: "/community", icon: getIcons("cardList", 34) },
  { name: "마이페이지", href: "/mypage", icon: getIcons("avatar", 34) },
];
