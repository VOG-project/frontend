import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "@/components/ErrorBoundary";
import GlobalStyle from "@/styles/GlobalStyle";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ErrorBoundary>
        <RecoilRoot>
          <GlobalStyle />
          <Component {...pageProps} />
        </RecoilRoot>
      </ErrorBoundary>
    </>
  );
}
