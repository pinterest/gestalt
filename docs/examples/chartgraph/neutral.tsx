import { useState } from 'react';
import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: '10-24',
      Impressions: 1000,
    },
    {
      name: '25-50',
      Impressions: 1500,
    },
    {
      name: '50+',
      Impressions: 2000,
    },
  ];

  return (
    <Flex direction="column" gap={2} height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="Example of a vertical bar chart"
        // @ts-expect-error - TS2322 - Type '{ name: string; Impressions: number; CPM: number; CPC: number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
        data={data}
        elements={[{ type: 'bar', id: 'Impressions', color: 'neutral' }]}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        title="Age"
        type="bar"
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
        visualPatternSelected={visualPatternSelected}
      />
    </Flex>
  );
}
