// @flow strict
import { type Node } from 'react';
import { Box, Divider } from 'gestalt';
import Header from './Header.js';
import Navigation from './Navigation.js';
import Footer from './Footer.js';

type Props = {|
  children?: Node,
|};

export default function AppLayout({ children }: Props): Node {
  return (
    <Box minHeight="100vh" color="white">
      <Header />

      <Box mdDisplay="flex">
        <Box minWidth={240}>
          <Navigation />
        </Box>

        <Divider />

        <Box width="100%" minWidth={0}>
          <Box padding={4} mdPadding={6} lgPadding={8} width="100%" role="main">
            {children}
          </Box>

          <Divider />

          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
