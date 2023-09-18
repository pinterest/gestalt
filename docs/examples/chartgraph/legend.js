// @flow strict
import { type Node, useState } from 'react';
import { Flex, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    { name: new Date(2023, 0, 1).getTime(), 'California': 1500000, 'Arizona': 500000 },
    { name: new Date(2023, 1, 2).getTime(), 'California': 1000000, 'Arizona': 400000 },
    { name: new Date(2023, 2, 3).getTime(), 'California': 1500000, 'Arizona': 500000 },
    { name: new Date(2023, 3, 4).getTime(), 'California': 1000000, 'Arizona': 400000 },
    { name: new Date(2023, 4, 5).getTime(), 'California': 1500000, 'Arizona': 500000 },
    { name: new Date(2023, 5, 6).getTime(), 'California': 1000000, 'Arizona': 400000 },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        title="Average spend by region"
        accessibilityLabel="Example of chart with tooltip"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
        }
        variant="timeseries"
        data={data}
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
        elements={[
          { type: 'bar', id: 'California' },
          { type: 'bar', id: 'Arizona' },
        ]}
        type="bar"
        tickFormatter={{
          yAxisLeft: (value) => {
            if (value >= 1000000) return `${value / 1000000}m`;
            if (value >= 1000) return `${value / 1000}k`;
            return value;
          },
          xAxisBottom: (date) =>
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
              date,
            )} ${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        }}
      />
    </Flex>
  );
}
