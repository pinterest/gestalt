// @flow strict
import { type Node, useState } from 'react';
import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
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
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        title="Regions in the US"
        accessibilityLabel="Example of a vertical bar chart"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        layout="horizontal"
        data={data}
        elements={[
          { type: 'bar', id: 'Impressions' },
          { type: 'bar', id: 'CPM' },
          { type: 'bar', id: 'CPC' },
        ]}
      />
    </Flex>
  );
}
