// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import { Chart } from 'gestalt-charts';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      {/* $FlowFixMe[prop-missing] */}
      <Chart />
    </ColorSchemeProvider>
  );
}
