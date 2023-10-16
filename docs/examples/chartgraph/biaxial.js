// @flow strict
import { type Node, useState } from 'react';
import { FixedZIndex, Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: new Date(2023, 0, 1).getTime(),
      'Spend': 350000,
      'Total ROAS (Checkout)': 570000,
    },
    {
      name: new Date(2023, 1, 1).getTime(),
      'Spend': 800000,
      'Total ROAS (Checkout)': 690000,
    },
    {
      name: new Date(2023, 2, 1).getTime(),
      'Spend': 890000,
      'Total ROAS (Checkout)': 850000,
    },
    {
      name: new Date(2023, 3, 1).getTime(),
      'Spend': 870000,
      'Total ROAS (Checkout)': 550000,
    },
    {
      name: new Date(2023, 4, 1).getTime(),
      'Spend': 830000,
      'Total ROAS (Checkout)': 84000,
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
          { type: 'line', id: 'Total ROAS (Checkout)', axis: 'right' },
        ]}
        type="line"
        tickFormatter={{
          yAxisLeft: (value) => {
            if (value >= 1000000) return `${value / 1000000}m`;
            if (value >= 1000) return `${value / 1000}k`;
            return value;
          },
          timeseries: (date) =>
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
              date,
            )} ${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        }}
        modalZIndex={new FixedZIndex(11)}
      />
    </Flex>
  );
}
