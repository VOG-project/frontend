import { Global } from "@emotion/react";
import tw, { css, theme, GlobalStyles as BaseStyles } from "twin.macro";

const global = css({
  html: {
    fontFamily: "Pretendard, system-ui, sans-serif",
    color: theme`colors.white`,
    backgroundColor: theme`colors.black`,
    height: "100%",
  },
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
    height: "100%",
  },
  "#__next": {
    height: "100%",
  },
});

export default function GlobalStyle() {
  return (
    <>
      <BaseStyles />
      <Global styles={global} />
    </>
  );
}
