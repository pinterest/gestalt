// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import { Chart } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    {
      name: 'A',
      'bar_1': 50,
      'line_2': 100,
    },
    {
      name: 'B',
      'bar_1': 100,
      'line_2': 200,
    },
    {
      name: 'C',
      'bar_1': 250,
      'line_2': 300,
    },
    {
      name: 'D',
      'bar_1': 300,
      'line_2': 400,
    },
    {
      name: 'E',
      'bar_1': 400,
      'line_2': 500,
    },
    {
      name: 'F',
      'bar_1': 400,
      'line_2': 600,
    },
    {
      name: 'G',
      'bar_1': 400,
      'line_2': 700,
    },
  ];

  return (
    <Flex direction="column" width="100%" height="100%">
      <Chart
        biaxial
        type="composed"
        data={data}
        renderTooltip={({ label }) => (
          <Flex direction="column" gap={2}>
            <Text>{label}</Text>
          </Flex>
        )}
      >
        <Chart.Bar id="bar_1" color="01" yAxis="left" />
        <Chart.Line id="line_2" color="02" yAxis="right" />
      </Chart>
    </Flex>
  );
}
