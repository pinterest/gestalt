import { Box, ColorSchemeProvider } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Box width={200}>
        <ChartGraph
          accessibilityLabel="Example of Bar chart"
          data={[
            // @ts-expect-error - TS2322 - Type '{ name: string; Series_01: number; }' is not assignable to type '{ [key: string]: number; name: string | number; }'.
            {
              name: 'A',
              'Series_01': 100,
            },
            // @ts-expect-error - TS2322 - Type '{ name: string; Series_01: number; }' is not assignable to type '{ [key: string]: number; name: string | number; }'.
            {
              name: 'B',
              'Series_01': 200,
            },
            // @ts-expect-error - TS2322 - Type '{ name: string; Series_01: number; }' is not assignable to type '{ [key: string]: number; name: string | number; }'.
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
