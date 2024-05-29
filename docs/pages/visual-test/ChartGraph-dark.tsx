import { Box, ColorSchemeProvider } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box width={200}>
        <ChartGraph
          accessibilityLabel="Example of Bar chart"
          data={[
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'.
            { 
              name: 'A',
              'Series_01': 100,
            },
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'.
            { 
              name: 'B',
              'Series_01': 200,
            },
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type 'number | undefined'.
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
