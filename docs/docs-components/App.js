// @flow strict
import { type Node, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ColorSchemeProvider, GlobalEventsHandlerProvider } from 'gestalt';
import { AppContextConsumer, AppContextProvider } from './appContext.js';
import AppLayout from './AppLayout.js';
import DocsExperimentProvider from './contexts/DocsExperimentProvider.js';
import { LocalFilesProvider } from './contexts/LocalFilesProvider.js';
import { NavigationContextProvider } from './navigationContext.js';

type Props = {|
  children?: Node,
  files?: {|
    css: string,
    js: string,
  |},
|};

export default function App({ children, files }: Props): Node {
  const router = useRouter();

  // $FlowIssue[prop-missing]
  const isLeftClickEvent = (event: SyntheticEvent<EventTarget, Event>) => event.button === 0; // ignore everything but left clicks
  const isModifiedEvent = (event: SyntheticEvent<EventTarget, Event>) =>
    // $FlowIssue[prop-missing]
    !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey); // ignore clicks with modifier keys

  const useOnNavigation = ({
    href,
    target,
  }: {|
    href: string,
    target?: null | 'self' | 'blank',
  |}) => {
    const onNavigationClick = ({ event }: {| +event: SyntheticEvent<> |}) => {
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
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  // See additional Providers added in pages/_app.js (dependent for Playwright visual diff testing)
  return (
    <AppContextProvider>
      <DocsExperimentProvider>
        <AppContextConsumer>
          {({ colorScheme }) => (
            <ColorSchemeProvider colorScheme={colorScheme} id="gestalt-docs">
              <GlobalEventsHandlerProvider linkHandlers={{ onNavigation: useOnNavigation }}>
                <NavigationContextProvider>
                  <LocalFilesProvider files={files}>
                    <AppLayout colorScheme={colorScheme}>{children}</AppLayout>
                  </LocalFilesProvider>
                </NavigationContextProvider>
              </GlobalEventsHandlerProvider>
            </ColorSchemeProvider>
          )}
        </AppContextConsumer>
      </DocsExperimentProvider>
    </AppContextProvider>
  );
}
