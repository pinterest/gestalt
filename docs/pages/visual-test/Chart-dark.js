// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import { Chart } from 'gestalt-charts';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      {/* $FlowFixMe[prop-missing] */}
      <Chart />
    </ColorSchemeProvider>
  );
}
