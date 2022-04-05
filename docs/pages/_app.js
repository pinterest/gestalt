// @flow strict
import { type Node } from 'react';
import '../docs.css';
import 'gestalt/dist/gestalt.css';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';
import Cookies from 'universal-cookie';
import NextApp, { type AppInitialProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/router';
import { Box } from 'gestalt';
import App from '../components/App.js';
import DocsExperimentProvider from '../components/contexts/DocsExperimentProvider.js';
import DocsI18nProvider from '../components/contexts/DocsI18nProvider.js';

// Adding providers here instead of components/App.js as they're needed by visual tests as well
function Providers({ children }: {| children: Node |}): Node {
  return (
    <DocsExperimentProvider>
      <DocsI18nProvider>{children}</DocsI18nProvider>
    </DocsExperimentProvider>
  );
}

// This default export is required in a new `pages/_app.js` file.
function GestaltApp(
  // $FlowFixMe[signature-verification-failure]
  { Component, pageProps, cookieHeader },
): Node {
  const router = useRouter();

  // Hide navigation / sidebar for visual tests
  if (router.pathname.startsWith('/visual-test/')) {
    return (
      <Providers>
        <Box data-test-id="visual-test" display="inlineBlock">
          <Component {...pageProps} />
        </Box>
      </Providers>
    );
  }

  const cookies = new Cookies(cookieHeader);

  return (
    <CookiesProvider cookies={cookies}>
      <Providers>
        <App>
          <Component {...pageProps} />
        </App>
      </Providers>
    </CookiesProvider>
  );
}

GestaltApp.getInitialProps = async (appInitialProps: AppInitialProps): Promise<AppInitialProps> => {
  const initialProps = await NextApp.getInitialProps(appInitialProps);
  const cookieHeader = appInitialProps?.ctx?.req?.headers?.cookie;
  return { ...initialProps, ...(cookieHeader ? { cookieHeader } : {}) };
};

export default GestaltApp;
