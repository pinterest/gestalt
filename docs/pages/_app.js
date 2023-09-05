// @flow strict
import '../docs.css';
// import css in the order rollut build them in the dist/
import 'gestalt/dist/gestalt.css';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';
import 'gestalt-charts/dist/gestalt-charts.css';
import { promises as fs } from 'fs';
import path from 'path';
import { type Node, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import NextApp, { type AppInitialProps } from 'next/app';
import { useRouter } from 'next/router';
import parser from 'ua-parser-js';
import Cookies from 'universal-cookie';
import { Box, DeviceTypeProvider } from 'gestalt';
import App from '../docs-components/App.js';
import { DocsConfigProvider } from '../docs-components/contexts/DocsConfigProvider.js';
import DocsDefaultLabelProvider from '../docs-components/contexts/DocsDefaultLabelProvider.js';

function Providers({ children, isMobile }: {| children: Node, isMobile: boolean |}): Node {
  const [isMobileDevice] = useState(isMobile);

  return (
    // Providers needed for visual diff tests are located here rather within components/App.js
    <DocsConfigProvider isMobile={isMobileDevice}>
      <DeviceTypeProvider deviceType={isMobileDevice ? 'mobile' : 'desktop'}>
        <DocsDefaultLabelProvider>{children}</DocsDefaultLabelProvider>
      </DeviceTypeProvider>
    </DocsConfigProvider>
  );
}

// This default export is required in a new `pages/_app.js` file.
function GestaltApp(
  // $FlowFixMe[missing-local-annot]
  // $FlowFixMe[signature-verification-failure]
  { Component, pageProps, cookieHeader, isMobile, files }, // eslint-disable-line react/prop-types
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

  const cookies = new Cookies(cookieHeader);

  return (
    <CookiesProvider cookies={cookies}>
      <Providers isMobile={isMobile}>
        <App files={files}>
          <Component {...pageProps} />
        </App>
      </Providers>
    </CookiesProvider>
  );
}

async function localFiles() {
  const gestaltBuildDirectory = path.join(process.cwd(), '..', 'packages', 'gestalt', 'dist');
  const [css, js] = await Promise.all([
    fs.readFile(path.join(gestaltBuildDirectory, 'gestalt.css'), 'utf8'),
    fs.readFile(path.join(gestaltBuildDirectory, 'gestalt.js'), 'utf8'),
  ]);
  return { css, js };
}

GestaltApp.getInitialProps = async (appInitialProps: AppInitialProps): Promise<AppInitialProps> => {
  const initialProps = await NextApp.getInitialProps(appInitialProps);
  const cookieHeader = appInitialProps?.ctx?.req?.headers?.cookie;
  const files = appInitialProps?.router?.query?.localFiles === 'true' ? await localFiles() : null;

  const ua = parser(appInitialProps?.ctx?.req?.headers['user-agent']);
  const isMobile = ua?.device?.type === 'mobile';

  return {
    ...initialProps,
    ...(cookieHeader ? { cookieHeader } : {}),
    isMobile,
    files,
  };
};

export default GestaltApp;
