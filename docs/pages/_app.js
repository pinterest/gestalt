// @flow strict
import { type Node } from 'react';
import '../docs.css';
import 'gestalt/dist/gestalt.css';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';
import NextApp from 'next/app';
import { useRouter } from 'next/router';
import { Box } from 'gestalt';
import App from '../components/App.js';
import Cookies from 'universal-cookie';
import { CookiesProvider } from 'react-cookie';

// This default export is required in a new `pages/_app.js` file.
function GestaltApp(
  // $FlowFixMe[signature-verification-failure]
  { Component, pageProps }, // eslint-disable-line react/prop-types
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

  return (
    <CookiesProvider cookies={new Cookies(pageProps.cookieHeader)}>
      <App>
        <Component {...pageProps} />
      </App>
    </CookiesProvider>
  );
}

GestaltApp.getInitialProps = async (appContext) => {
  const initialProps = await NextApp.getInitialProps(appContext);
  let ctx = appContext.ctx;

  if (ctx.req && ctx.req.headers.cookie) {
    return { ...initialProps, pageProps: { cookieHeader: ctx.req.headers.cookie } };
  }

  return { ...initialProps };
};

export default GestaltApp;
