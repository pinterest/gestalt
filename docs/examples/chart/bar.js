// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import { Chart } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    {
      name: 'A',
      'bar_01': 2400,
      'bar_02': 2400,
      'bar_03': 2400,
    },
    {
      name: 'B',
      'bar_01': 2400,
      'bar_02': 2400,
      'bar_03': 2400,
    },
    {
      name: 'C',
      'bar_01': 2400,
      'bar_02': 9800,
      'bar_03': 2400,
    },
    {
      name: 'D',
      'bar_01': 2400,
      'bar_02': 2400,
      'bar_03': 2400,
    },
    {
      name: 'E',
      'bar_01': 2400,
      'bar_02': 2400,
      'bar_03': 2400,
    },
    {
      name: 'F',
      'bar_01': 2400,
      'bar_02': 2400,
      'bar_03': 2400,
    },
    {
      name: 'G',
      'bar_01': 2400,
      'bar_02': 2400,
      'bar_03': 2400,
    },
  ];

  return (
    <Flex direction="column" width="100%" height="100%">
      <Chart
        xAxisLabel="axis X"
        yAxisLabel="axis Y"
        type="bar"
        data={data}
        renderTooltip={({ label }) => (
          <Flex direction="column" gap={2}>
            <Text>{label}</Text>
          </Flex>
        )}
        elements={[
          { type: 'bar', id: 'bar_01', color: '01', axis: 'yAxisLeft' },
          { type: 'bar', id: 'bar_02', color: '02', axis: 'yAxisLeft' },
          { type: 'bar', id: 'bar_03', color: '03', axis: 'yAxisLeft' },
        ]}
      />
    </Flex>
  );
}
