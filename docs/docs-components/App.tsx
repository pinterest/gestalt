import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { ColorSchemeProvider, GlobalEventsHandlerProvider } from 'gestalt';
import { AppContextConsumer, AppContextProvider } from './appContext';
import AppLayout from './AppLayout';
import DocsExperimentProvider from './contexts/DocsExperimentProvider';
import { LocalFilesProvider } from './contexts/LocalFilesProvider';
import { NavigationContextProvider } from './navigationContext';

type Props = {
  children?: ReactNode;
  files?: {
    css: string;
    js: string;
  };
};

export default function App({ children, files }: Props) {
  const router = useRouter();

  // @ts-expect-error - TS2339 - Property 'button' does not exist on type 'SyntheticEvent<EventTarget, Event>'.
  const isLeftClickEvent = (event: React.SyntheticEvent<EventTarget, Event>) => event.button === 0; // ignore everything but left clicks
  const isModifiedEvent = (event: React.SyntheticEvent<EventTarget, Event>) =>
    // @ts-expect-error - TS2339 - Property 'metaKey' does not exist on type 'SyntheticEvent<EventTarget, Event>'. | TS2339 - Property 'altKey' does not exist on type 'SyntheticEvent<EventTarget, Event>'. | TS2339 - Property 'ctrlKey' does not exist on type 'SyntheticEvent<EventTarget, Event>'. | TS2339 - Property 'shiftKey' does not exist on type 'SyntheticEvent<EventTarget, Event>'.
    !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey); // ignore clicks with modifier keys

  const useOnNavigation = ({
    href,
    target,
  }: {
    href: string;
    target?: null | 'self' | 'blank';
  }) => {
    const onNavigationClick = ({ event }: { readonly event: React.SyntheticEvent }) => {
      if (event.defaultPrevented) return; // onClick prevented default
      if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;
      if (target === 'blank') return; // let browser handle "target=_blank"

      event.preventDefault();
      router.push(href).catch((e) => {
        // workaround for https://github.com/vercel/next.js/issues/37362
        if (!e.cancelled) {
          throw e;
        }
      });
    };

    return onNavigationClick;
  };

  useEffect(() => {
    // Report route changes to Google Analytics
    const handleRouteChange = () => {
      // @ts-expect-error - TS2339 - Property 'gtag' does not exist on type 'Window & typeof globalThis'.
      if (!window.gtag) {
        return;
      }
      // @ts-expect-error - TS2339 - Property 'gtag' does not exist on type 'Window & typeof globalThis'.
      window.gtag('config', 'G-EYTY1WTV8B', {
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
        {/* @ts-expect-error - TS2786 - 'AppContextConsumer' cannot be used as a JSX component. */}
        <AppContextConsumer>
          {({ colorScheme }) => (
            <ColorSchemeProvider colorScheme={colorScheme}>
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
