import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const data = [
    {
      name: new Date(2023, 0, 1).getTime(),
      'Impressions': 850000,
    },
    {
      name: new Date(2023, 0, 2).getTime(),
      'Impressions': 800000,
    },
    {
      name: new Date(2023, 0, 3).getTime(),
      'Impressions': 890000,
    },
    {
      name: new Date(2023, 0, 4).getTime(),
      'Impressions': 870000,
    },
    {
      name: new Date(2023, 0, 5).getTime(),
      'Impressions': 830000,
    },
    {
      name: new Date(2023, 0, 6).getTime(),
      'Impressions': 930000,
    },
    {
      name: new Date(2023, 0, 7).getTime(),
      'Impressions': 630000,
    },
    {
      name: new Date(2023, 0, 8).getTime(),
      'Impressions': 730000,
    },
    {
      name: new Date(2023, 0, 9).getTime(),
      'Impressions': 890000,
    },
  ];

  return (
    <Flex direction="column" gap={2} height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="Example of chart with reference area"
        data={data}
        elements={[{ type: 'line', id: 'Impressions' }]}
        onVisualPatternChange={() => {}}
        range={{
          yAxisLeft: [0, 1000000],
          xAxisBottom: ['auto', new Date(2023, 0, 10).getTime()],
        }}
        referenceAreas={[
          {
            id: 'ExampleBD',
            label: 'Real-time data not available',
            x1: new Date(2023, 0, 9).getTime(),
            x2: new Date(2023, 0, 10).getTime(),
            yAxisId: 'left',
            y1: 0,
            y2: 1000000,
          },
        ]}
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
        title="Impressions over time"
        type="line"
        visualPatternSelected="disabled"
      />
    </Flex>
  );
}
