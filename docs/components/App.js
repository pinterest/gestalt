// @flow strict
import { useEffect, type Node } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import { useRouter } from 'next/router';
import { AppContextProvider, AppContextConsumer } from './appContext.js';
import { NavigationContextProvider } from './navigationContext.js';
import AppLayout from './AppLayout.js';

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
    <AppContextProvider>
      <AppContextConsumer>
        {({ colorScheme }) => (
          <ColorSchemeProvider colorScheme={colorScheme} id="gestalt-docs">
            <NavigationContextProvider>
              <AppLayout>{children}</AppLayout>
            </NavigationContextProvider>
          </ColorSchemeProvider>
        )}
      </AppContextConsumer>
    </AppContextProvider>
  );
}
