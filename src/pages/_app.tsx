import { GlobalStyle } from "@/styles/GlobalStyle";
import type { AppProps } from "next/app";

import AppProvider from "@/contexts";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <GlobalStyle />
      <Component {...pageProps} />;
    </AppProvider>
  );
}

export default MyApp;
