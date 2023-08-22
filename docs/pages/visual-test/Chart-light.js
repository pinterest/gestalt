// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider } from 'gestalt';
import { Chart } from 'gestalt-datepicker';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Chart />
    </ColorSchemeProvider>
  );
}
