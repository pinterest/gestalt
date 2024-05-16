import { ReactNode, useState } from 'react';
import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'Pacific Northwest',
      Impressions: 1000,
      CPM: 1050,
      CPC: 1000,
    },
    {
      name: 'Sunbelt',
      Impressions: 1000,
      CPM: 1500,
      CPC: 1000,
    },
    {
      name: 'Great Lakes',
      Impressions: 1000,
      CPM: 1050,
      CPC: 1000,
    },
  ];

  return (
    <Flex direction="column" gap={2} height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="Example of a vertical bar chart"
        // @ts-expect-error - TS2322 - Type '{ name: string; Impressions: number; CPM: number; CPC: number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
        data={data}
        elements={[
          { type: 'bar', id: 'Impressions' },
          { type: 'bar', id: 'CPM' },
          { type: 'bar', id: 'CPC' },
        ]}
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
