// @flow strict
import { type Node, useState } from 'react';
import { FixedZIndex, Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: new Date(2023, 0, 1).getTime(),
      'Spend': 1000,
      'ROAS': 5000,
    },
    {
      name: new Date(2023, 1, 1).getTime(),
      'Spend': 1200,
      'ROAS': 7000,
    },
    {
      name: new Date(2023, 2, 1).getTime(),
      'Spend': 1250,
      'ROAS': 15000,
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
          { type: 'line', id: 'Spend', axis: 'left' },
          { type: 'line', id: 'ROAS', axis: 'right' },
        ]}
        type="line"
        tickFormatter={{
          yAxisLeft: (value) => {
            if (value >= 500) return `$${value / 500}k`;
            return value;
          },
          yAxisRight: (value) => {
            if (value >= 1000) return `${value / 1000}k`;
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
