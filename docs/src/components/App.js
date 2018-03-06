// @flow
import type { Node } from 'react';
import React from 'react';
import { withRouter } from 'react-router-dom';
import { Box, Column } from 'gestalt';
import Navigation from './Navigation';

type Props = {|
  children?: Node,
|};

const NavigationWithRouter = withRouter(Navigation);

export default function App(props: Props) {
  const { children } = props;
  return (
    <Box mdDisplay="flex" direction="row" minHeight="100vh">
      <Column span={12} mdSpan={2}>
        <Box padding={4}>
          <NavigationWithRouter />
        </Box>
      </Column>
      <Column span={12} mdSpan={10}>
        <Box padding={4}>{children}</Box>
      </Column>
    </Box>
  );
}
