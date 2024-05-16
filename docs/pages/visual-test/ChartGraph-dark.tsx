import { ReactNode } from 'react';
import { Box, ColorSchemeProvider } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box width={200}>
        <ChartGraph
          accessibilityLabel="Example of Bar chart"
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
          description="Description"
          elements={[{ type: 'bar', id: 'Series_01' }]}
          legend="auto"
          onVisualPatternChange={() => {}}
          title="Title"
          type="bar"
          visualPatternSelected="default"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
