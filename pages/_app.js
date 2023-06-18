import { Provider } from "react-redux";
import "@/styles/globals.scss";
import store from "@/store";
import { ChakraProvider } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import LoadUser from "@/components/utils/LoadUser";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Provider store={store}>
          <Toaster />
          <NextNProgress color="#38A169" />
          <LoadUser />
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
