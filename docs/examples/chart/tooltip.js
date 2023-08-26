// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import { Chart } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    {
      name: 'A',
      'bar_01': 10000,
      'line_02': 5000,
      'bar_03': 2400,
    },
    {
      name: 'B',
      'bar_01': 2400,
      'line_02': 5000,
      'bar_03': 2400,
    },
    {
      name: 'C',
      'bar_01': 2400,
      'line_02': 9800,
      'bar_03': 2400,
    },
    {
      name: 'D',
      'bar_01': 2400,
      'line_02': 5000,
      'bar_03': 2400,
    },
    {
      name: 'E',
      'bar_01': 2400,
      'line_02': 5000,
      'bar_03': 2400,
    },
    {
      name: 'F',
      'bar_01': 2400,
      'line_02': 5000,
      'bar_03': 2400,
    },
    {
      name: 'G',
      'bar_01': 2400,
      'line_02': 5000,
      'bar_03': 2400,
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
                  <Chart.Marker color={payload[0].fill} />
                  <Text>{payload[0].name}: </Text>
                  <Text>{payload[0].value}</Text>
                </Flex>
                <Flex alignItems="center" gap={2}>
                  <Chart.Marker color={payload[1].fill} />
                  <Text>{payload[1].name}: </Text>
                  <Text>{payload[1].value}</Text>
                </Flex>
                <Flex alignItems="center" gap={2}>
                  <Chart.Marker color={payload[2].fill} />
                  <Text>{payload[2].name}: </Text>
                  <Text>{payload[2].value}</Text>
                </Flex>
              </Flex>
            );
          }
          return null;
        }}
        elements={[
          { type: 'bar', id: 'bar_01', color: '01', yAxis: 'left' },
          { type: 'bar', id: 'bar_02', color: '02', yAxis: 'left' },
          { type: 'line', id: 'line_03', color: '03', yAxis: 'right' },
        ]}
      />
    </Flex>
  );
}
