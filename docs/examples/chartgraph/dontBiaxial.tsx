import { ReactNode, useState } from 'react';
import { FixedZIndex, Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
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
    <Flex direction="column" gap={2} height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="Example of line chart"
        data={data}
        elements={[
          { type: 'line', id: 'CPC', axis: 'left' },
          { type: 'line', id: 'CPM', axis: 'right' },
        ]}
        layout="verticalBiaxial"
        modalZIndex={new FixedZIndex(11)}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        range={{ xAxisBottom: ['auto', 'auto'] }}
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
        title="Performance over last 30 days"
        type="line"
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
        visualPatternSelected={visualPatternSelected}
      />
    </Flex>
  );
}
