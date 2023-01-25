import { Global } from "@emotion/react";
import tw, { css, theme, GlobalStyles as BaseStyles } from "twin.macro";

const global = css({
  html: {
    fontFamily: "Pretendard, system-ui, sans-serif",
    color: theme`colors.white`,
    backgroundColor: theme`colors.black`,
  },
  body: {
    WebkitTapHighlightColor: theme`colors.purple.500`,
    ...tw`antialiased`,
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
