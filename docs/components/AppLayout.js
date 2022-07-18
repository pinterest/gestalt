// @flow strict
import { type Node } from 'react';
import { Box, Divider } from 'gestalt';
import Header from './Header.js';
import Navigation, { MIN_NAV_WIDTH_PX } from './Navigation.js';
import Footer from './Footer.js';
import ResourcesFooter from './ResourcesFooter.js';

const CONTENT_MAX_WIDTH_PX = 1544;

type Props = {|
  children?: Node,
  colorScheme?: 'light' | 'dark',
  isHomePage?: boolean,
|};

export default function AppLayout({ children, colorScheme, isHomePage }: Props): Node {
  const footerColor =
    colorScheme === 'dark' ? 'var(--color-gray-roboflow-700)' : 'var(--color-orange-firetini-0)';
  return (
    <Box minHeight="100vh" color="default">
      <Header />

      <Box mdDisplay="flex">
        <Box minWidth={MIN_NAV_WIDTH_PX}>
          <Navigation />
        </Box>

        <Divider />

        <Box width="100%" minWidth={0}>
          <Box
            padding={4}
            mdPadding={8}
            marginBottom={12}
            width="100%"
            role="main"
            lgDisplay="flex"
            justifyContent="center"
          >
            <Box width="100%" maxWidth={CONTENT_MAX_WIDTH_PX}>
              {children}
            </Box>
          </Box>
          <Box
            role="contentinfo"
            color={!isHomePage ? 'default' : undefined}
            dangerouslySetInlineStyle={{
              __style: {
                backgroundColor: isHomePage ? footerColor : undefined,
              },
            }}
          >
            {isHomePage && <ResourcesFooter />}
            <Divider />
            <Footer />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
