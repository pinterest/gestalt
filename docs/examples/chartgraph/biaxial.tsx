import { ReactNode, useState } from 'react';
import { FixedZIndex, Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: new Date(2023, 0, 1).getTime(),
      'Spend': 40000,
      'Total ROAS (Checkout)': 570000,
    },
    {
      name: new Date(2023, 1, 1).getTime(),
      'Spend': 45000,
      'Total ROAS (Checkout)': 690000,
    },
    {
      name: new Date(2023, 2, 1).getTime(),
      'Spend': 55000,
      'Total ROAS (Checkout)': 850000,
    },
    {
      name: new Date(2023, 3, 1).getTime(),
      'Spend': 70000,
      'Total ROAS (Checkout)': 550000,
    },
    {
      name: new Date(2023, 4, 1).getTime(),
      'Spend': 830000,
      'Total ROAS (Checkout)': 1000000,
    },
  ];

  return (
    <Flex direction="column" gap={2} height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="Example of line chart"
        data={data}
        elements={[
          { type: 'line', id: 'Spend', axis: 'left' },
          { type: 'line', id: 'Total ROAS (Checkout)', axis: 'right' },
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
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
              date,
            )} ${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        }}
        title="Performance over last 30 days"
        type="line"
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
        visualPatternSelected={visualPatternSelected}
      />
    </Flex>
  );
}
