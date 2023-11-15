// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): ReactNode {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'iOS',
      '18-30': 850000,
      '30-50': 870000,
      '50+': 980000,
    },
    {
      name: 'Android',
      '18-30': 800000,
      '30-50': 690000,
      '50+': 590000,
    },
    {
      name: 'Web',
      '18-30': 890000,
      '30-50': 850000,
      '50+': 950000,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        title="Views by demographics and device"
        accessibilityLabel="Example of chart with tooltip"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        initialTicks={3}
        data={data}
        elements={[
          { type: 'bar', id: '18-30' },
          { type: 'bar', id: '30-50' },
          { type: 'bar', id: '50+' },
        ]}
        type="bar"
        tickFormatter={{
          yAxisLeft: (value) => {
            if (value >= 1000000) return `${value / 1000000}m`;
            if (value >= 1000) return `${value / 1000}k`;
            return value;
          },
        }}
      />
    </Flex>
  );
}
