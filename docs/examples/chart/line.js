// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import { Chart } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    {
      name: 'A',
      'line_01': 2400,
      'line_02': 2400,
      'line_03': 2400,
    },
    {
      name: 'B',
      'line_01': 2400,
      'line_02': 2400,
      'line_03': 2400,
    },
    {
      name: 'C',
      'line_01': 2400,
      'line_02': 9800,
      'line_03': 2400,
    },
    {
      name: 'D',
      'line_01': 2400,
      'line_02': 2400,
      'line_03': 2400,
    },
    {
      name: 'E',
      'line_01': 2400,
      'line_02': 2400,
      'line_03': 2400,
    },
    {
      name: 'F',
      'line_01': 2400,
      'line_02': 2400,
      'line_03': 2400,
    },
    {
      name: 'G',
      'line_01': 2400,
      'line_02': 2400,
      'line_03': 2400,
    },
  ];

  return (
    <Flex direction="column" width="100%" height="100%">
      <Chart
        xAxisLabel="axis X"
        yAxisLabel="axis Y"
        type="line"
        data={data}
        renderTooltip={({ label }) => (
          <Flex direction="column" gap={2}>
            <Text>{label}</Text>
          </Flex>
        )}
        elements={[
          { type: 'line', id: 'line_01', color: '01', yAxis: 'left' },
          { type: 'line', id: 'line_02', color: '02', yAxis: 'left' },
          { type: 'line', id: 'line_03', color: '03', yAxis: 'left' },
        ]}
      />
    </Flex>
  );
}
