// @flow strict
import React, { useState } from 'react';
import { Box, Column, Divider, Link, Text } from 'gestalt';
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
          <Column span={12} mdSpan={2}>
            <Navigation />
          </Column>
          <Divider />
          <Column span={12} mdSpan={8}>
            <Box padding={4} mdPadding={6} lgPadding={8}>
              {children}
            </Box>
          </Column>
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
