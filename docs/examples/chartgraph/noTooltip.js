// @flow strict
import { type Node, useState } from 'react';
import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: '20-30',
      'Impressions': 100,
    },
    {
      name: '30-40',
      'Impressions': 200,
    },
    {
      name: '40-50',
      'Impressions': 300,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column">
      <ChartGraph
        title="MAU per age range"
        tickFormatter={{ yAxisLeft: (value) => `${value}m` }}
        accessibilityLabel="Example of chart with tooltip"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
        }
        initialTicks={3}
        type="bar"
        legend="none"
        data={data}
        renderTooltip="none"
        elements={[
          {
            type: 'bar',
            id: 'Impressions',
          },
        ]}
      />
    </Flex>
  );
}
