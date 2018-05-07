// @flow
import type { Node } from 'react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Column, Divider } from 'gestalt';
import Header from './Header';
import Navigation from './Navigation';

type Props = {|
  children?: Node,
|};

const NavigationWithRouter = withRouter(Navigation);

export default function App(props: Props) {
  const { children } = props;
  return (
    <Box minHeight="100vh">
      <Header />

      <Box mdDisplay="flex" direction="row">
        <Column span={12} mdSpan={2}>
          <NavigationWithRouter />
        </Column>
        <Divider />
        <Column span={12} mdSpan={8}>
          <Box padding={4} mdPadding={6} lgPadding={8}>
            {children}
          </Box>
        </Column>
      </Box>
    </Box>
  );
}
