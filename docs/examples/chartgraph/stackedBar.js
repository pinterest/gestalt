// @flow strict
import { type Node, useState } from 'react';
import { Flex, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: new Date(2023, 0, 1).getTime(),
      'Awareness': 5000,
      'Consideration': 1000,
      'Catalog sales': 4000,
      'Conversions': 2500,
    },
    {
      name: new Date(2023, 1, 1).getTime(),
      'Awareness': 4000,
      'Consideration': 5000,
      'Catalog sales': 1000,
      'Conversions': 2500,
    },
    {
      name: new Date(2023, 2, 1).getTime(),
      'Awareness': 2500,
      'Consideration': 5000,
      'Catalog sales': 1000,
      'Conversions': 4000,
    },
    {
      name: new Date(2023, 3, 1).getTime(),
      'Awareness': 2500,
      'Consideration': 4000,
      'Catalog sales': 1000,
      'Conversions': 5000,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        title="508 campaigns"
        stacked
        accessibilityLabel="Example of stacked bars chart"
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
          { type: 'bar', id: 'Awareness' },
          { type: 'bar', id: 'Consideration' },
          { type: 'bar', id: 'Catalog sales' },
          { type: 'bar', id: 'Conversions' },
        ]}
        variant="timeseries"
        tickFormatter={{
          yAxisLeft: (value) => `${value / 1000}K`,
          xAxisBottom: (date) =>
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
              date,
            )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        }}
      />
    </Flex>
  );
}
