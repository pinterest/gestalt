// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import { Chart } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    {
      name: 'A',
      'bar_01': 50,
      'line_02': 100,
    },
    {
      name: 'B',
      'bar_01': 100,
      'line_02': 200,
    },
    {
      name: 'C',
      'bar_01': 250,
      'line_02': 300,
    },
    {
      name: 'D',
      'bar_01': 300,
      'line_02': 400,
    },
    {
      name: 'E',
      'bar_01': 400,
      'line_02': 500,
    },
    {
      name: 'F',
      'bar_01': 400,
      'line_02': 600,
    },
    {
      name: 'G',
      'bar_01': 400,
      'line_02': 700,
    },
  ];

  return (
    <Flex direction="column" width="100%" height="100%">
      <Chart
        biaxial="yAxis"
        xAxisLabel="X axis"
        yAxisLabel="Y axis"
        type="composed"
        data={data}
        renderTooltip={({ label }) => (
          <Flex direction="column" gap={2}>
            <Text>{label}</Text>
          </Flex>
        )}
        elements={[
          { type: 'bar', id: 'bar_01', color: '01', axis: 'yAxisLeft' },
          { type: 'line', id: 'line_02', color: '02', axis: 'yAxisRight' },
        ]}
      />
    </Flex>
  );
}
