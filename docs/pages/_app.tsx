import '../docs.css';
import '../css/year-in-review-2023.css';
// import css in the order rollut build them in the dist/
import 'gestalt/dist/gestalt.css';
import 'gestalt-datepicker/dist/gestalt-datepicker.css';
import { promises as fs } from 'fs';
import path from 'path';
import { ReactNode, useState } from 'react';
import { CookiesProvider } from 'react-cookie';
import NextApp, { AppInitialProps } from 'next/app';
import { useRouter } from 'next/router';
import parser from 'ua-parser-js';
import Cookies from 'universal-cookie';
import { Box, DeviceTypeProvider } from 'gestalt';
import App from '../docs-components/App';
import { DocsConfigProvider } from '../docs-components/contexts/DocsConfigProvider';
import DocsDefaultLabelProvider from '../docs-components/contexts/DocsDefaultLabelProvider';

function Providers({ children, isMobile }: { children: ReactNode; isMobile: boolean }) {
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
  // @ts-expect-error - TS7031 - Binding element 'Component' implicitly has an 'any' type. | TS7031 - Binding element 'pageProps' implicitly has an 'any' type. | TS7031 - Binding element 'cookieHeader' implicitly has an 'any' type. | TS7031 - Binding element 'isMobile' implicitly has an 'any' type. | TS7031 - Binding element 'files' implicitly has an 'any' type.
  { Component, pageProps, cookieHeader, isMobile, files },
) {
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
  // @ts-expect-error - TS2345 - Argument of type 'AppInitialProps<any>' is not assignable to parameter of type 'AppContext'.
  const initialProps = await NextApp.getInitialProps(appInitialProps);
  // @ts-expect-error - TS2339 - Property 'ctx' does not exist on type 'AppInitialProps<any>'.
  const cookieHeader = appInitialProps?.ctx?.req?.headers?.cookie;
  // @ts-expect-error - TS2339 - Property 'router' does not exist on type 'AppInitialProps<any>'.
  const files = appInitialProps?.router?.query?.localFiles === 'true' ? await localFiles() : null;

  // @ts-expect-error - TS2339 - Property 'ctx' does not exist on type 'AppInitialProps<any>'.
  const ua = parser(appInitialProps?.ctx?.req?.headers['user-agent']);
  const isMobile = ua?.device?.type === 'mobile';

  return {
    ...initialProps,
    ...(cookieHeader ? { cookieHeader } : {}),
    // @ts-expect-error - TS2322 - Type '{ isMobile: boolean; files: { css: string; js: string; } | null; cookieHeader?: any; pageProps: any; }' is not assignable to type 'AppInitialProps<any>'.
    isMobile,
    files,
  };
};

export default GestaltApp;
