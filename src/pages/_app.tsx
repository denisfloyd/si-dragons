import type { AppProps } from "next/app";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { GlobalStyle } from "@/styles/GlobalStyle";

import AppProvider from "@/contexts";

import { queryClient } from "@/services/queryClient";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <GlobalStyle />
        <Component {...pageProps} />
      </AppProvider>
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default MyApp;
