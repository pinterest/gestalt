// @flow strict
import { type Node, useState } from 'react';
import { Flex, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: new Date(2023, 0, 1).getTime(),
      'Spend': 350000,
      'Total ROAS (Checkout)': 570000,
    },
    {
      name: new Date(2023, 1, 1).getTime(),
      'Spend': 800000,
      'Total ROAS (Checkout)': 690000,
    },
    {
      name: new Date(2023, 2, 1).getTime(),
      'Spend': 890000,
      'Total ROAS (Checkout)': 850000,
    },
    {
      name: new Date(2023, 3, 1).getTime(),
      'Spend': 870000,
      'Total ROAS (Checkout)': 550000,
    },
    {
      name: new Date(2023, 4, 1).getTime(),
      'Spend': 830000,
      'Total ROAS (Checkout)': 84000,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        title="Performance over last 30 days"
        accessibilityLabel="Example of line chart"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
        }
        layout="verticalBiaxial"
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
          { type: 'line', id: 'Spend' },
          { type: 'line', id: 'Total ROAS (Checkout)' },
        ]}
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
            )} ${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        }}
      />
    </Flex>
  );
}
