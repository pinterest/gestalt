import { ReactNode, useState } from 'react';
import { Flex, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'USA',
      '20-30': 100,
      '40-50': 200,
      '50-60': 300,
    },
    {
      name: 'Europe',
      '20-30': 200,
      '40-50': 300,
      '50-60': 400,
    },
  ];

  return (
    <Flex direction="column" height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="Example of chart with tooltip"
        data={data}
        elements={[
          {
            type: 'bar',
            id: '20-30',
          },
          {
            type: 'bar',
            id: '40-50',
          },
          {
            type: 'bar',
            id: '50-60',
          },
        ]}
        initialTicks={3}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        renderTooltip={({ label, payload, active }) =>
          active && Array.isArray(payload) ? (
            <Flex direction="column" gap={2}>
              <Flex.Item>
                {payload.map(
                  (payloadData: {
                    dataKey: string;
                    color?: string | null | undefined;
                    fill?: string | null | undefined;
                    isLegend?: boolean;
                    legendType?: 'line' | 'rect';
                    name: string;
                    stroke?: string | null | undefined;
                    strokeDasharray?: string | number | null | undefined;
                    value: number;
                    strokeWidth?: number;
                  }) => (
                    <Flex key={payloadData.name} alignItems="center" gap={2}>
                      <ChartGraph.LegendIcon payloadData={payloadData} />
                      <Flex.Item flex="grow">
                        <Text size="100">{payloadData.name}</Text>
                      </Flex.Item>
                      <Text size="200" weight="bold">
                        ${payloadData.value}
                      </Text>
                    </Flex>
                  ),
                )}
              </Flex.Item>
              <Text color="subtle" size="100">
                {label}
              </Text>
            </Flex>
          ) : null
        }
        tickFormatter={{ yAxisLeft: (value) => `${value}m` }}
        title="MAU per regions"
        type="bar"
        visualPatternSelected={visualPatternSelected}
      />
    </Flex>
  );
}
