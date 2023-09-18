// @flow strict
import { type Node, useState } from 'react';
import { Flex, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'Quarter 1',
      'This year': 850000,
      'Profit': 870000,
      'Last year': 980000,
    },
    {
      name: 'Quarter 2',
      'This year': 800000,
      'Profit': 690000,
      'Last year': 590000,
    },
    {
      name: 'Quarter 3',
      'This year': 890000,
      'Profit': 850000,
      'Last year': 950000,
    },
    {
      name: 'Quarter 4',
      'This year': 870000,
      'Profit': 550000,
      'Last year': 830000,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        title="Product group sales:"
        accessibilityLabel="Example of combo chart"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
        }
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
          { type: 'bar', id: 'This year' },
          { type: 'bar', id: 'Profit' },
          { type: 'line', id: 'Last year' },
        ]}
        type="combo"
        tickFormatter={{
          yAxisLeft: (value) => {
            if (value >= 1000000) return `${value / 1000000}m`;
            if (value >= 1000) return `${value / 1000}k`;
            return value;
          },
        }}
      />
    </Flex>
  );
}
