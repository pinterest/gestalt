// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { FixedZIndex, Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): ReactNode {
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
    <Flex direction="column" gap={2} height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="Example of line chart"
        data={data}
        elements={[
          { type: 'line', id: 'Spend', axis: 'left' },
          { type: 'line', id: 'ROAS', axis: 'right' },
        ]}
        layout="verticalBiaxial"
        modalZIndex={new FixedZIndex(11)}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        range={{ xAxisBottom: ['auto', 'auto'] }}
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
        title="Performance over last 30 days"
        type="line"
        visualPatternSelected={visualPatternSelected}
      />
    </Flex>
  );
}
