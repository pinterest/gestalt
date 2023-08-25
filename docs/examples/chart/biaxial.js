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
      'bar_3': 50,
    },
    {
      name: 'B',
      'bar_1': 100,
      'line_2': 200,
      'bar_3': 100,
    },
    {
      name: 'C',
      'bar_1': 250,
      'line_2': 300,
      'bar_3': 250,
    },
    {
      name: 'D',
      'bar_1': 300,
      'line_2': 400,
      'bar_3': 300,
    },
    {
      name: 'E',
      'bar_1': 400,
      'line_2': 500,
      'bar_3': 400,
    },
    {
      name: 'F',
      'bar_1': 400,
      'line_2': 600,
      'bar_3': 400,
    },
    {
      name: 'G',
      'bar_1': 400,
      'line_2': 700,
      'bar_3': 400,
    },
  ];

  return (
    <Flex direction="column" width="100%" height="100%">
      <Chart
        biaxial
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
        <Chart.Bar id="bar_3" color="03" yAxis="left" />
        <Chart.Line id="line_2" color="02" yAxis="right" />
      </Chart>
    </Flex>
  );
}
