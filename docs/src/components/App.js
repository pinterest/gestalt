// @flow
import * as React from 'react';
import { Box, Column, Divider } from 'gestalt';
import Header from './Header';
import Navigation from './Navigation';

type Props = {|
  children?: React.Node,
|};

export default function App(props: Props) {
  const { children } = props;
  return (
    <Box minHeight="100vh">
      <React.StrictMode>
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
      </React.StrictMode>
    </Box>
  );
}
