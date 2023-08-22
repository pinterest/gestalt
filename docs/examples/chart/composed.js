// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import { Chart } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    {
      name: 'A',
      'bar_1': 2400,
      'line_2': 5000,
      'bar_3': 2400,
    },
    {
      name: 'B',
      'bar_1': 2400,
      'line_2': 5000,
      'bar_3': 2400,
    },
    {
      name: 'C',
      'bar_1': 2400,
      'line_2': 9800,
      'bar_3': 2400,
    },
    {
      name: 'D',
      'bar_1': 2400,
      'line_2': 5000,
      'bar_3': 2400,
    },
    {
      name: 'E',
      'bar_1': 2400,
      'line_2': 5000,
      'bar_3': 2400,
    },
    {
      name: 'F',
      'bar_1': 2400,
      'line_2': 5000,
      'bar_3': 2400,
    },
    {
      name: 'G',
      'bar_1': 2400,
      'line_2': 5000,
      'bar_3': 2400,
    },
  ];

  return (
    <Flex direction="column" width="100%" height="100%">
      <Chart
        type="composed"
        data={data}
        // renderTooltip={({ label, payload }) => (
        renderTooltip={({ label }) => (
          <Flex direction="column" gap={2}>
            {/* <Text>{JSON.stringify(payload)}</Text> */}
            <Text>{label}</Text>
          </Flex>
        )}
      >
        <Chart.Bar id="bar_1" color="01" yAxis="left" />
        <Chart.Line id="line_2" color="02" yAxis="left" />
        <Chart.Bar id="bar_3" color="03" yAxis="left" />
      </Chart>
    </Flex>
  );
}
