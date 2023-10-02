// @flow strict
import { type Node, useState } from 'react';
import { FixedZIndex, Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'Quarter 1',
      'This year': 850000,
      'Profit': 870000,
      'Last year': 980000,
    },
    {
      name: 'Quarter 2',
      'This year': 800000,
      'Profit': 690000,
      'Last year': 590000,
    },
    {
      name: 'Quarter 3',
      'This year': 890000,
      'Profit': 850000,
      'Last year': 950000,
    },
    {
      name: 'Quarter 4',
      'This year': 870000,
      'Profit': 550000,
      'Last year': 830000,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        title="Product group sales:"
        accessibilityLabel="Example of combo chart"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        data={data}
        elements={[
          { type: 'bar', id: 'This year' },
          { type: 'bar', id: 'Profit' },
          { type: 'line', id: 'Last year' },
        ]}
        type="combo"
        tickFormatter={{
          yAxisLeft: (value) => {
            if (value >= 1000000) return `${value / 1000000}m`;
            if (value >= 1000) return `${value / 1000}k`;
            return value;
          },
        }}
        modalZIndex={new FixedZIndex(11)}
      />
    </Flex>
  );
}
