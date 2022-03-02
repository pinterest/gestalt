// @flow strict
import { type Node } from 'react';
import { Box, Divider } from 'gestalt';
import Header from './Header.js';
import Navigation, { MIN_NAV_WIDTH_PX } from './Navigation.js';
import Footer from './Footer.js';

const CONTENT_MAX_WIDTH_PX = 1544;

type Props = {|
  children?: Node,
|};

export default function AppLayout({ children }: Props): Node {
  return (
    <Box minHeight="100vh" color="white">
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

          <Divider />

          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
