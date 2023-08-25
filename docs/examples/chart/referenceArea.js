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
        type="bar"
        data={data}
        // renderTooltip={({ label, payload }) => (
        renderTooltip={({ label }) => (
          <Flex direction="column" gap={2}>
            {/* <Text>{JSON.stringify(payload)}</Text> */}
            <Text>{label}</Text>
          </Flex>
        )}
        referenceAreas={[
          {
            id: 'ExampleBD',
            isFront: true,
            x1: 'B',
            x2: 'D',
            yAxisId: 'left',
            y1: 7000,
            y2: 7500,
            stroke: 'red',
            strokeOpacity: 0.3,
          },
          {
            id: 'ExampleFG',
            isFront: true,
            x1: 'F',
            x2: 'G',
            yAxisId: 'left',
            y1: 5000,
            y2: 7500,
            stroke: 'red',
            strokeOpacity: 0.3,
          },
        ]}
      >
        <Chart.Bar id="bar_1" color="01" yAxis="left" />
        <Chart.Bar id="bar_2" color="02" yAxis="left" />
        <Chart.Bar id="bar_3" color="03" yAxis="left" />
      </Chart>
    </Flex>
  );
}
