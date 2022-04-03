import "../styles/globals.css";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0";
import store from "../redux/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }: AppProps) {
  const { user } = pageProps;
  return (
    <Provider store={store}>
      <UserProvider user={user}>
        <Component {...pageProps} />
      </UserProvider>
    </Provider>
  );
}

export default MyApp;
