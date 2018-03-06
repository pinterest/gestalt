// @flow
import type { Node } from 'react';
import React from 'react';
import Navigation from './Navigation';
import { Box, Column } from 'gestalt';

type Props = {|
  children?: Node,
|};

export default function App(props: Props) {
  const { children } = props;
  return (
    <Box mdDisplay="flex" direction="row" minHeight="100vh">
      <Column span={12} mdSpan={2}>
        <Box padding={4}>
          <Navigation />
        </Box>
      </Column>
      <Column span={12} mdSpan={10}>
        <Box padding={4}>{children}</Box>
      </Column>
    </Box>
  );
}
