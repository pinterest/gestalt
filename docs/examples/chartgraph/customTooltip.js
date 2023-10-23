// @flow strict

import { type Node, useState } from 'react';
import { Flex, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
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
    <Flex height="100%" width="100%" direction="column">
      <ChartGraph
        title="MAU per regions"
        accessibilityLabel="Example of chart with tooltip"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        tickFormatter={{ yAxisLeft: (value) => `${value}m` }}
        initialTicks={3}
        type="bar"
        data={data}
        renderTooltip={({ label, payload, active }) =>
          active && Array.isArray(payload) ? (
            <Flex direction="column" gap={2}>
              <Flex.Item>
                {payload.map(
                  (payloadData: {
                    dataKey: string,
                    color?: ?string,
                    fill?: ?string,
                    isLegend?: boolean,
                    legendType?: 'line' | 'rect',
                    name: string,
                    stroke?: ?string,
                    strokeDasharray?: ?(string | number),
                    value: number,
                    strokeWidth?: number,
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
              <Text size="100" color="subtle">
                {label}
              </Text>
            </Flex>
          ) : null
        }
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
      />
    </Flex>
  );
}
