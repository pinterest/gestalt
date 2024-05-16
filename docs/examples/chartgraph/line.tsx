import { ReactNode, useState } from 'react';
import { FixedZIndex, Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: new Date(2023, 0, 1).getTime(),
      'Engagement': 850000,
      'Saves': 870000,
      'Impressions': 280000,
      'Page visits': 5000,
    },
    {
      name: new Date(2023, 1, 2).getTime(),
      'Engagement': 800000,
      'Saves': 690000,
      'Impressions': 790000,
      'Page visits': 9000,
    },
    {
      name: new Date(2023, 2, 3).getTime(),
      'Engagement': 890000,
      'Saves': 850000,
      'Impressions': 250000,
      'Page visits': 8000,
    },
    {
      name: new Date(2023, 3, 4).getTime(),
      'Engagement': 870000,
      'Saves': 550000,
      'Impressions': 230000,
      'Page visits': 7000,
    },
    {
      name: new Date(2023, 4, 5).getTime(),
      'Engagement': 830000,
      'Saves': 84000,
      'Impressions': 710000,
      'Page visits': 3000,
    },
  ];

  return (
    <Flex direction="column" gap={2} height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="Example of line chart"
        data={data}
        elements={[
          { type: 'line', id: 'Engagement' },
          { type: 'line', id: 'Saves' },
          { type: 'line', id: 'Impressions' },
          { type: 'line', id: 'Page visits' },
        ]}
        modalZIndex={new FixedZIndex(11)}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        range={{
          xAxisBottom: ['auto', 'auto'],
        }}
        tickFormatter={{
          yAxisLeft: (value) => {
            if (value >= 1000000) return `${value / 1000000}m`;
            if (value >= 1000) return `${value / 1000}k`;
            return value;
          },
          timeseries: (date) =>
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
              date,
            )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        }}
        title="Performance over time"
        type="line"
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
        visualPatternSelected={visualPatternSelected}
      />
    </Flex>
  );
}
