// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    { name: new Date(2023, 0, 1).getTime(), 'Paid': 3000, 'Organic': 200, 'Earned': 2050 },
    { name: new Date(2023, 1, 2).getTime(), 'Paid': 2003, 'Organic': 200, 'Earned': 1060 },
    { name: new Date(2023, 2, 3).getTime(), 'Paid': 3000, 'Organic': 500, 'Earned': 1050 },
    { name: new Date(2023, 3, 4).getTime(), 'Paid': 2000, 'Organic': 300, 'Earned': 1070 },
    { name: new Date(2023, 4, 5).getTime(), 'Paid': 4000, 'Organic': 400, 'Earned': 3050 },
    { name: new Date(2023, 5, 6).getTime(), 'Paid': 3005, 'Organic': 70, 'Earned': 2080 },
    { name: new Date(2023, 6, 7).getTime(), 'Paid': 5000, 'Organic': 600, 'Earned': 1050 },
    { name: new Date(2023, 7, 8).getTime(), 'Paid': 6000, 'Organic': 200, 'Earned': 2040 },
    { name: new Date(2023, 8, 8).getTime(), 'Paid': 4000, 'Organic': 400, 'Earned': 1050 },
    { name: new Date(2023, 9, 8).getTime(), 'Paid': 3005, 'Organic': 500, 'Earned': 1080 },
    { name: new Date(2023, 10, 8).getTime(), 'Paid': 4000, 'Organic': 550, 'Earned': 2050 },
    { name: new Date(2023, 11, 8).getTime(), 'Paid': 3000, 'Organic': 700, 'Earned': 1050 },
  ];

  return (
    <ChartGraph
      title="Pin clicks over time"
      accessibilityLabel="Pin clicks over time (example)"
      visualPatternSelected="disabled"
      onVisualPatternChange={() => {}}
      type="line"
      range={{
        xAxisBottom: ['auto', 'auto'],
      }}
      layout="vertical"
      variant="timeseries"
      data={data}
      elements={[
        { type: 'line', id: 'Paid', color: '06' },
        { type: 'line', id: 'Organic', color: '09' },
        { type: 'line', id: 'Earned', color: '11' },
      ]}
      tickFormatter={{
        yAxisLeft: (value) => `${value / 1000}K`,
        xAxisBottom: (date) =>
          `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
            date,
          )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
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
