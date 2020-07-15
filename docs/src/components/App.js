// @flow strict
import React, { useState } from 'react';
import { Box, Divider, GestaltProvider, Link, Text } from 'gestalt';
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
          {document.location.href.includes('netlify') ? (
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
          ) : null}
        </Box>
      </GestaltProvider>
    </SidebarContextProvider>
  );
}
