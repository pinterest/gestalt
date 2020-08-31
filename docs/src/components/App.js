// @flow strict
import React, { useState, type Node } from 'react';
import { Box, Divider, Provider, Link, Text } from 'gestalt';
import Header from './Header.js';
import Navigation from './Navigation.js';
import useTracking from './useTracking.js';
import { SidebarContextProvider } from './sidebarContext.js';

type Props = {|
  children?: Node,
|};

const localStorageOrganizedByKey = 'gestalt-sidebar-organized-by';

export default function App(props: Props): Node {
  const { children } = props;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [colorScheme, setColorScheme] = useState('light');

  useTracking('UA-12967896-44');

  const [sidebarOrganisedBy, setSidebarOrganizedBy] = useState<
    'categorized' | 'alphabetical'
  >(() => {
    try {
      // $FlowIssue[incompatible-call]
      return localStorage.getItem(localStorageOrganizedByKey) || 'categorized';
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
    return 'categorized';
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(localStorageOrganizedByKey, sidebarOrganisedBy);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  }, [sidebarOrganisedBy]);

  return (
    <SidebarContextProvider
      value={{
        isSidebarOpen,
        setIsSidebarOpen,
        sidebarOrganisedBy,
        setSidebarOrganizedBy,
      }}
    >
      <Provider colorScheme={colorScheme}>
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
            <Box width="100%">
              <Box padding={4} mdPadding={6} lgPadding={8} width="100%">
                {children}
              </Box>
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
        </Box>
      </Provider>
    </SidebarContextProvider>
  );
}
