import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import ErrorBoundary from "@/components/ErrorBoundary";
import GlobalStyle from "@/styles/GlobalStyle";
import Toast from "@/components/Toast";
import Socket from "@/components/Socket";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ErrorBoundary>
        <RecoilRoot>
          <GlobalStyle />
          <Toast />
          <Socket />
          <Component {...pageProps} />
        </RecoilRoot>
      </ErrorBoundary>
    </>
  );
}
