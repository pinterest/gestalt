// @flow strict
import { type Node, useState } from 'react';
import { Flex, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    { name: new Date(2023, 0, 1).getTime(), 'Actual data': 1000 },
    { name: new Date(2023, 1, 1).getTime(), 'Actual data': 1567 },
    { name: new Date(2023, 2, 1).getTime(), 'Actual data': 1005 },
    { name: new Date(2023, 3, 1).getTime(), 'Actual data': 1003 },
    { name: new Date(2023, 4, 1).getTime(), 'Actual data': 1100 },
    { name: new Date(2023, 5, 1).getTime(), 'Actual data': 1030 },
    { name: new Date(2023, 6, 1).getTime(), 'Actual data': 1089 },
    { name: new Date(2023, 7, 1).getTime(), 'Actual data': 1065, 'Forecast': 1065 },
    { name: new Date(2023, 8, 1).getTime(), 'Forecast': 1089 },
    { name: new Date(2023, 9, 1).getTime(), 'Forecast': 1030 },
    { name: new Date(2023, 10, 1).getTime(), 'Forecast': 1990 },
    { name: new Date(2023, 11, 1).getTime(), 'Forecast': 2034 },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        title="Forecast for 2023"
        accessibilityLabel="Example of time series chart"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
        }
        data={data}
        range={{
          xAxisBottom: ['auto', 'auto'],
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
        elements={[
          { type: 'line', id: 'Actual data', precision: 'exact' },
          { type: 'line', id: 'Forecast', precision: 'estimate' },
        ]}
        variant="timeseries"
        type="line"
        tickFormatter={{
          xAxisBottom: (date) =>
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
              date,
            )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        }}
      />
    </Flex>
  );
}
