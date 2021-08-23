// @flow strict
import { useEffect, Fragment, type Node } from 'react';
import { Box, Divider, ColorSchemeProvider, Link, Text } from 'gestalt';
import { useRouter } from 'next/router';
import Header from './Header.js';
import Navigation from './Navigation.js';
import { AppContextProvider, AppContextConsumer } from './appContext.js';
import { NavigationContextProvider } from './navigationContext.js';

type Props = {|
  children?: Node,
|};

export default function App({ children }: Props): Node {
  const router = useRouter();

  useEffect(() => {
    // Report route changes to Google Analytics
    const handleRouteChange = () => {
      if (!window.gtag) {
        return;
      }
      window.gtag('config', 'UA-12967896-44', {
        page_path: window.location.pathname + window.location.search + window.location.hash,
      });
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Fragment>
      <AppContextProvider>
        <AppContextConsumer>
          {({ colorScheme }) => (
            <ColorSchemeProvider colorScheme={colorScheme} id="gestalt-docs">
              <NavigationContextProvider>
                <Box minHeight="100vh" color="white">
                  <Header />

                  <Box mdDisplay="flex">
                    <Box minWidth={240}>
                      <Navigation />
                    </Box>

                    <Divider />

                    <Box width="100%" minWidth={0}>
                      <Box padding={4} mdPadding={6} lgPadding={8} width="100%" role="main">
                        {children}
                      </Box>

                      <Divider />

                      <Box padding={4} mdPadding={6} lgPadding={8} role="contentinfo">
                        <Box paddingX={2} paddingY={1}>
                          <Text align="end">
                            <Link href="https://www.netlify.com/">
                              This site is powered by Netlify
                            </Link>
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </NavigationContextProvider>
            </ColorSchemeProvider>
          )}
        </AppContextConsumer>
      </AppContextProvider>
    </Fragment>
  );
}
