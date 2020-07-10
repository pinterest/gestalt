// @flow strict
import React, { useState } from 'react';
import { Box, Divider, GestaltProvider, Link, Text } from 'gestalt';
import Head from 'next/head';
import Header from './Header.js';
import Navigation from './Navigation.js';
import { SidebarContextProvider } from './sidebarContext.js';

type Props = {|
  children?: React.Node,
|};

export default function App(props: Props) {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [colorScheme, setColorScheme] = useState('light');

  return (
    <SidebarContextProvider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      <GestaltProvider colorScheme={colorScheme}>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
          <meta name="theme-color" content="#000000" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="shortcut icon" href="/pinterest_favicon.png" />
          <script
            type="text/javascript"
            dangerouslySetInlineHtml={{
              __html: `
          <script type="text/javascript">
          // Load polyfills for IE 11
          if (/MSIE \\d|Trident.*rv:/.test(navigator.userAgent))
            document.write(
              '<script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>' +
              '<script src="https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js"></script>'
            );
        </script>
          `,
            }}
          />
          <script
            type="text/javascript"
            src="https://cdn.jsdelivr.net/npm/docsearch.js@2/dist/cdn/docsearch.min.js"
          />
          <title>Gestalt</title>
        </Head>
        <Box minHeight="100vh" color="white">
          <Header
            colorScheme={colorScheme}
            onChangeColorScheme={() =>
              setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
            }
          />
          <Box mdDisplay="flex" direction="row">
            <Box minWidth={240}>
              <Navigation />
            </Box>
            <Divider />
            <Box width="auto">
              <Box padding={4} mdPadding={6} lgPadding={8}>
                {children}
              </Box>
            </Box>
          </Box>
          <Box>
            <Divider />

            <Box padding={4} mdPadding={6} lgPadding={8}>
              <Link href="https://www.netlify.com/">
                <Box paddingX={2} paddingY={1}>
                  <Text align="right">This site is powered by Netlify</Text>
                </Box>
              </Link>
            </Box>
          </Box>
        </Box>
      </GestaltProvider>
    </SidebarContextProvider>
  );
}
