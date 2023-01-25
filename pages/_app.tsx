import type { AppProps } from "next/app";
import ErrorBoundary from "@/components/ErrorBoundary";
import GlobalStyle from "@/styles/GlobalStyle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ErrorBoundary>
        <GlobalStyle />
        <Component {...pageProps} />
      </ErrorBoundary>
    </>
  );
}
