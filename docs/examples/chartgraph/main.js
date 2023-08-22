// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    { name: new Date(2023, 0, 1).getTime(), 'Impressions': 100 },
    { name: new Date(2023, 1, 1).getTime(), 'Impressions': 200 },
    { name: new Date(2023, 2, 1).getTime(), 'Impressions': 250 },
    { name: new Date(2023, 3, 1).getTime(), 'Impressions': 300 },
    { name: new Date(2023, 4, 1).getTime(), 'Impressions': 350 },
    { name: new Date(2023, 4, 1).getTime(), 'Impression trends': 350 },
    { name: new Date(2023, 5, 1).getTime(), 'Impression trends': 350 },
    { name: new Date(2023, 6, 1).getTime(), 'Impression trends': 1000 },
    { name: new Date(2023, 7, 1).getTime(), 'Impression trends': 3000 },
  ];

  return (
    <ChartGraph
      title="Impressions"
      description="Performance over time. Impressions is the number of times your Pin was on screen."
      accessibilityLabel="Example of line chart"
      visualPatternSelected="disabled"
      onVisualPatternChange={() => {}}
      type="line"
      variant="timeseries"
      data={data}
      elements={[
        { type: 'line', id: 'Impressions', color: '01' },
        { type: 'line', id: 'Impression trends', color: '01', precision: 'estimate' },
      ]}
      tickFormatter={{
        xAxisBottom: (date) =>
          `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)}`,
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
    />
  );
}
