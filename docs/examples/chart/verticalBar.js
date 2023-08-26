// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import { Chart } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    {
      name: 'A',
      'bar_1': 2400,
      'bar_2': 2400,
      'bar_3': 2400,
    },
    {
      name: 'B',
      'bar_1': 2400,
      'bar_2': 2400,
      'bar_3': 2400,
    },
    {
      name: 'C',
      'bar_1': 2400,
      'bar_2': 9800,
      'bar_3': 2400,
    },
    {
      name: 'D',
      'bar_1': 2400,
      'bar_2': 2400,
      'bar_3': 2400,
    },
    {
      name: 'E',
      'bar_1': 2400,
      'bar_2': 2400,
      'bar_3': 2400,
    },
    {
      name: 'F',
      'bar_1': 2400,
      'bar_2': 2400,
      'bar_3': 2400,
    },
    {
      name: 'G',
      'bar_1': 2400,
      'bar_2': 2400,
      'bar_3': 2400,
    },
  ];

  return (
    <Flex direction="column" width="100%" height="100%">
      <Chart
        type="composed"
        // layout="vertical"
        data={data}
        renderTooltip={({ label }) => (
          <Flex direction="column" gap={2}>
            <Text>{label}</Text>
          </Flex>
        )}
      >
        <Chart.Bar id="bar_1" color="01" />
        <Chart.Bar id="bar_2" color="02" />
        <Chart.Bar id="bar_3" color="03" />
      </Chart>
    </Flex>
  );
}
