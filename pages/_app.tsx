import type { AppProps } from "next/app";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme";
import ErrorBoundary from "@/components/ErrorBoundary/ErrorBoundary";
import GlobalStyle from "@/styles/GlobalStyle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </ErrorBoundary>
    </>
  );
}
