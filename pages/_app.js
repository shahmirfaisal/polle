import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";
import { PollContextProvider } from "../context/PollContext/";
import { UserContextProvider } from "../context/UserContext/";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />

        <UserContextProvider>
          <PollContextProvider>
            <Component {...pageProps} />
          </PollContextProvider>
        </UserContextProvider>
      </ThemeProvider>

      <NotificationContainer />
    </CacheProvider>
  );
};

export default App;
