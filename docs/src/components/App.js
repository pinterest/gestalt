// @flow strict
import React, { type Node, useEffect } from 'react';
import { Box, Divider, Provider, Link, Text } from 'gestalt';
import Header from './Header.js';
import Navigation from './Navigation.js';
import useTracking from './useTracking.js';
import useLocalStorage from './useLocalStorage.js';
import { PropTableContextProvider } from './propTableContext.js';
import { NavigationSidebarContextProvider } from './navigationSidebarContext.js';

type Props = {|
  children?: Node,
|};

const localStorageColorSchemeKey = 'gestalt-color-scheme';
const localStorageTextDirectionKey = 'gestalt-text-direction';

export default function App(props: Props): Node {
  const { children } = props;

  useTracking('UA-12967896-44');

  const [colorScheme, setColorScheme] = useLocalStorage<
    'light' | 'dark' | 'userPreference'
  >(localStorageColorSchemeKey, 'light');

  const [textDirection, setTextDirection] = useLocalStorage<'ltr' | 'rtl'>(
    localStorageTextDirectionKey,
    'ltr'
  );

  useEffect(() => {
    if (document && document.documentElement) {
      document.documentElement.dir = textDirection;
    }
  }, [textDirection]);

  return (
    <NavigationSidebarContextProvider>
      <Provider colorScheme={colorScheme}>
        <Box minHeight="100vh" color="white">
          <Header
            colorScheme={colorScheme}
            onChangeColorScheme={() =>
              setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
            }
            textDirection={textDirection}
            onTextDirectionChange={() =>
              setTextDirection(textDirection === 'rtl' ? 'ltr' : 'rtl')
            }
          />
          <Box mdDisplay="flex" direction="row">
            <Box minWidth={240}>
              <Navigation />
            </Box>
            <Divider />
            <Box width="100%">
              <Box
                padding={4}
                mdPadding={6}
                lgPadding={8}
                width="100%"
                role="main"
              >
                <PropTableContextProvider>{children}</PropTableContextProvider>
              </Box>
              <Divider />

              <Box padding={4} mdPadding={6} lgPadding={8} role="contentinfo">
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
    </NavigationSidebarContextProvider>
  );
}
