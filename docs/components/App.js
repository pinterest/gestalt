// @flow strict
import { useEffect, useState, type Node } from 'react';
import { ColorSchemeProvider, OnLinkNavigationProvider } from 'gestalt';
import { useRouter } from 'next/router';
import { AppContextProvider, AppContextConsumer } from './appContext.js';
import { NavigationContextProvider } from './navigationContext.js';
import AppLayout from './AppLayout.js';

type Props = {|
  children?: Node,
|};

export default function App({ children }: Props): Node {
  const router = useRouter();
  const [isHomePage, setIsHomePage] = useState(router?.route === '/home');

  // $FlowIssue[prop-missing]
  const isLeftClickEvent = (event) => event.button === 0; // ignore everything but left clicks
  const isModifiedEvent = (event) =>
    // $FlowIssue[prop-missing]
    !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey); // ignore clicks with modifier keys

  const useOnNavigation = ({ href, target }) => {
    const onNavigationClick = ({ event }) => {
      if (event.defaultPrevented) return; // onClick prevented default
      if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
      if (target === 'blank') return; // let browser handle "target=_blank"

      event.preventDefault();
      router.push(href);
    };

    return onNavigationClick;
  };

  useEffect(() => {
    // Report route changes to Google Analytics
    const handleRouteChange = () => {
      if (!window.gtag) {
        return;
      }
      window.gtag('config', 'UA-12967896-44', {
        page_path: window.location.pathname + window.location.search + window.location.hash,
      });
      setIsHomePage(window?.location?.pathname === '/home');
    };

    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // NOTE: there are other Providers added in pages/_app.js
  return (
    <AppContextProvider>
      <AppContextConsumer>
        {({ colorScheme }) => (
          <ColorSchemeProvider colorScheme={colorScheme} id="gestalt-docs">
            <OnLinkNavigationProvider onNavigation={useOnNavigation}>
              <NavigationContextProvider>
                <AppLayout showResources={isHomePage} colorScheme={colorScheme}>
                  {children}
                </AppLayout>
              </NavigationContextProvider>
            </OnLinkNavigationProvider>
          </ColorSchemeProvider>
        )}
      </AppContextConsumer>
    </AppContextProvider>
  );
}
