// @flow strict
import { useState, type Node } from 'react';
import '../docs.css';
import 'gestalt/dist/gestalt.css';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';
import Cookies from 'universal-cookie';
import NextApp, { type AppInitialProps } from 'next/app';
import { CookiesProvider } from 'react-cookie';
import { useRouter } from 'next/router';
import { Box, DeviceTypeProvider } from 'gestalt';
import App from '../components/App.js';
import DocsExperimentProvider from '../components/contexts/DocsExperimentProvider.js';
import DocsI18nProvider from '../components/contexts/DocsI18nProvider.js';
import { DocsDeviceTypeProvider } from '../components/contexts/DocsDeviceTypeProvider.js';

// import parser from 'ua-parser-js'; Install     "ua-parser-js": "^1.0.2" in packahe

// Adding providers here instead of components/App.js as they're needed by visual tests as well
function Providers({ children, isMobile }: {| children: Node, isMobile: boolean |}): Node {
  const [isMobileDevice] = useState(isMobile);

  return (
    <DocsDeviceTypeProvider isMobile={isMobileDevice}>
      <DeviceTypeProvider deviceType={isMobileDevice ? 'mobile' : 'desktop'}>
        <DocsExperimentProvider>
          <DocsI18nProvider>{children}</DocsI18nProvider>
        </DocsExperimentProvider>
      </DeviceTypeProvider>
    </DocsDeviceTypeProvider>
  );
}

// This default export is required in a new `pages/_app.js` file.
function GestaltApp(
  // $FlowFixMe[signature-verification-failure]
  { Component, pageProps, cookieHeader, isMobile }, // eslint-disable-line react/prop-types
): Node {
  const router = useRouter();

  // Hide navigation / sidebar for visual tests
  if (router.pathname.startsWith('/visual-test/')) {
    return (
      <Providers isMobile={isMobile}>
        <Box data-test-id="visual-test" display="inlineBlock">
          <Component {...pageProps} />
        </Box>
      </Providers>
    );
  }

  // Flow is wrong here https://github.com/reactivestack/cookies/tree/master/packages/universal-cookie
  // $FlowFixMe[invalid-constructor]
  const cookies = new Cookies(cookieHeader);

  return (
    <CookiesProvider cookies={cookies}>
      <Providers isMobile={isMobile}>
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

  // This should be replaced with a more sophisticated userAgent detection
  // var ua = parser(appInitialProps?.ctx?.req?.headers['user-agent']);
  // const isMobile = ua?.device?.type === 'mobile';

  const isMobile = appInitialProps?.ctx?.req?.headers['user-agent']
    ?.toLowerCase()
    .includes('mobile');

  return { ...initialProps, ...(cookieHeader ? { cookieHeader } : {}), ...{ isMobile } };
};

export default GestaltApp;
