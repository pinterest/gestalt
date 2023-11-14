// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { FixedZIndex, Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): ReactNode {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: new Date(2023, 0, 1).getTime(),
      'CPC': 5,
      'CPM': 7,
    },
    {
      name: new Date(2023, 1, 1).getTime(),
      'CPC': 6,
      'CPM': 2,
    },
    {
      name: new Date(2023, 2, 1).getTime(),
      'CPC': 8,
      'CPM': 10,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        title="Performance over last 30 days"
        accessibilityLabel="Example of line chart"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        layout="verticalBiaxial"
        data={data}
        range={{ xAxisBottom: ['auto', 'auto'] }}
        elements={[
          { type: 'line', id: 'CPC', axis: 'left' },
          { type: 'line', id: 'CPM', axis: 'right' },
        ]}
        type="line"
        tickFormatter={{
          yAxisLeft: (value) => {
            if (value >= 1) return `$${value / 1}`;
            return value;
          },
          yAxisRight: (value) => {
            if (value >= 1) return `$${value / 1}`;
            return value;
          },
          timeseries: (date) =>
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)}`,
        }}
        modalZIndex={new FixedZIndex(11)}
      />
    </Flex>
  );
}
