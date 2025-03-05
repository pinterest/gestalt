import { useState } from 'react';
import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'Pacific Northwest',
      Impressions: 1000,
      opacity: 1,
    },
    {
      name: 'Sunbelt',
      Impressions: 500,
      opacity: 0.4,
    },
    {
      name: 'Great Lakes',
      Impressions: 400,
      opacity: 0.4,
    },
  ];

  return (
    <Flex direction="column" gap={2} height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="Example of a vertical bar chart"
        // @ts-expect-error - TS2322 - Type '{ name: string; Impressions: number; CPM: number; CPC: number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
        data={data}
        elements={[{ type: 'bar', id: 'Impressions' }]}
        layout="horizontal"
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        title="Regions in the US"
        type="bar"
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
        visualPatternSelected={visualPatternSelected}
      />
    </Flex>
  );
}
