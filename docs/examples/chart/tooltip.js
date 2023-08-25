// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import { Chart } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    {
      name: 'A',
      'bar_1': 10000,
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
        biaxial
        data={data}
        renderTooltip={({ label, payload, active }) => {
          if (active && payload) {
            return (
              <Flex direction="column">
                <Text size="400">{label}</Text>
                <Flex alignItems="center" gap={2}>
                  <Chart.Marker color={payload[0].color} />
                  <Text>{payload[0].name}: </Text>
                  <Text>{payload[0].value}</Text>
                </Flex>
                <Flex alignItems="center" gap={2}>
                  <Chart.Marker color={payload[1].color} />
                  <Text>{payload[1].name}: </Text>
                  <Text>{payload[1].value}</Text>
                </Flex>
                <Flex alignItems="center" gap={2}>
                  <Chart.Marker color={payload[2].color} />
                  <Text>{payload[2].name}: </Text>
                  <Text>{payload[2].value}</Text>
                </Flex>
              </Flex>
            );
          }
          return null;
        }}
      >
        <Chart.Bar id="bar_1" color="01" yAxis="left" />
        <Chart.Bar id="bar_3" color="02" yAxis="left" />
        <Chart.Line id="line_2" color="03" yAxis="right" />
      </Chart>
    </Flex>
  );
}
