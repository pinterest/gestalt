// @flow strict
import { type Node } from 'react';
import { Box, ColorSchemeProvider } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box width={200}>
        <ChartGraph
          accessibilityLabel="Example of Bar chart"
          visualPatternSelected="default"
          onVisualPatternChange={() => {}}
          type="bar"
          title="Title"
          description="Description"
          legend="auto"
          data={[
            {
              name: 'A',
              'Series_01': 100,
            },
            {
              name: 'B',
              'Series_01': 200,
            },
            {
              name: 'C',
              'Series_01': 300,
            },
          ]}
          elements={[{ type: 'bar', id: 'Series_01' }]}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
