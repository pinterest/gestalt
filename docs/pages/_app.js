// @flow strict
import { type Node } from 'react';
import '../docs.css';
import 'gestalt/dist/gestalt.css';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';
import Cookies from 'universal-cookie';
import NextApp from 'next/app';
import type { AppInitialProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/router';
import { Box } from 'gestalt';
import App from '../components/App.js';

// This default export is required in a new `pages/_app.js` file.
function GestaltApp(
  // $FlowFixMe[signature-verification-failure]
  { Component, pageProps, cookieHeader }, // eslint-disable-line react/prop-types
): Node {
  const router = useRouter();

  // Hide navigation / sidebar for visual tests
  if (router.pathname.startsWith('/visual-test/')) {
    return (
      <Box data-test-id="visual-test" display="inlineBlock">
        <Component {...pageProps} />
      </Box>
    );
  }

  const cookies = new Cookies(cookieHeader);

  return (
    <CookiesProvider cookies={cookies}>
      <App>
        <Component {...pageProps} />
      </App>
    </CookiesProvider>
  );
}

GestaltApp.getInitialProps = async (appInitialProps: AppInitialProps): Promise<AppInitialProps> => {
  const initialProps = await NextApp.getInitialProps(appInitialProps);
  const cookieHeader = appInitialProps?.ctx?.req?.headers?.cookie;
  return { ...initialProps, ...(cookieHeader ? { cookieHeader } : {}) };
};

export default GestaltApp;
