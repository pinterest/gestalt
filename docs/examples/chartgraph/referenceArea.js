// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
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
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        title="Impressions over time"
        accessibilityLabel="Example of chart with reference area"
        visualPatternSelected="disabled"
        onVisualPatternChange={() => {}}
        data={data}
        range={{
          yAxisLeft: [0, 1000000],
          xAxisBottom: ['auto', new Date(2023, 0, 10).getTime()],
        }}
        renderTooltip={({ active, label, payload }) =>
          active && Array.isArray(payload) ? (
            <Flex direction="column" gap={2}>
              <Flex.Item>
                {payload.map(
                  (payloadData: {|
                    dataKey: string,
                    color?: ?string,
                    fill?: ?string,
                    isLegend?: boolean,
                    legendType?: 'line' | 'rect',
                    name: string,
                    stroke?: ?string,
                    strokeDasharray?: ?(string | number),
                    value: number,
                  |}) => (
                    <Flex key={payloadData.name} alignItems="center" gap={2}>
                      <ChartGraph.LegendIcon payloadData={payloadData} />
                      <Flex.Item flex="grow">
                        <Text size="100">{payloadData.name}</Text>
                      </Flex.Item>
                      <Text weight="bold" size="200">
                        {payloadData.value}
                      </Text>
                    </Flex>
                  ),
                )}
              </Flex.Item>
              <Text color="subtle" size="100">
                {typeof label === 'number' ? new Intl.DateTimeFormat('en-US').format(label) : ''}
              </Text>
            </Flex>
          ) : null
        }
        elements={[{ type: 'line', id: 'Impressions' }]}
        variant="timeseries"
        type="line"
        tickFormatter={{
          yAxisLeft: (value) => {
            if (value >= 1000000) return `${value / 1000000}m`;
            if (value >= 1000) return `${value / 1000}k`;
            return value;
          },
          xAxisBottom: (date) =>
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
              date,
            )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
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
      />
    </Flex>
  );
}
