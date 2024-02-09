// @flow strict
import { type Node as ReactNode } from 'react';
import dynamic from 'next/dynamic';
import { Box, ColorSchemeProvider } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

function NoSsr(props: { children: ReactNode }) {
  return <div> {props.children} </div>;
}

const NoSSR = dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});

export default function Snapshot(): ReactNode {
  return (
    <NoSSR>
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
    </NoSSR>
  );
}
