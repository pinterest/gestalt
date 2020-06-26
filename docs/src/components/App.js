// @flow strict
import React, { useState } from 'react';
import { Box, Divider, Link, Text } from 'gestalt';
import Header from './Header.js';
import Navigation from './Navigation.js';
import { SidebarContextProvider } from './SidebarContext.js';

type Props = {|
  children?: React.Node,
|};

export default function App(props: Props) {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarContextProvider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
      }}
    >
      <Box minHeight="100vh">
        <Header />
        <Box mdDisplay="flex" direction="row">
          <Box minWidth={200}>
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
    </SidebarContextProvider>
  );
}
