// @flow strict
import { type Node } from 'react';
import { Flex, Text } from 'gestalt';
import { Chart } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    {
      name: 'A',
      'color_01': 2400,
      'color_02': 2400,
      'color_03': 2400,
      'color_04': 2400,
      'color_05': 2400,
      'color_06': 2400,
      'color_07': 2400,
      'color_08': 2400,
      'color_09': 2400,
      'color_10': 2400,
      'color_11': 2400,
      'color_12': 2400,
    },
    {
      name: 'B',
      'color_01': 3600,
      'color_02': 3600,
      'color_03': 3600,
      'color_04': 3600,
      'color_05': 3600,
      'color_06': 3600,
      'color_07': 3600,
      'color_08': 3600,
      'color_09': 3600,
      'color_10': 3600,
      'color_11': 3600,
      'color_12': 3600,
    },
    {
      name: 'C',
      'color_01': 4800,
      'color_02': 4800,
      'color_03': 4800,
      'color_04': 4800,
      'color_05': 4800,
      'color_06': 4800,
      'color_07': 4800,
      'color_08': 4800,
      'color_09': 4800,
      'color_10': 4800,
      'color_11': 4800,
      'color_12': 4800,
    },
  ];

  return (
    <Flex direction="column" width="100%" height="100%">
      <Chart
        type="bar"
        data={data}
        renderTooltip={({ label }) => (
          <Flex direction="column" gap={2}>
            <Text>{label}</Text>
          </Flex>
        )}
      >
        <Chart.Bar id="color_01" color="01" yAxis="left" />
        <Chart.Bar id="color_02" color="02" yAxis="left" />
        <Chart.Bar id="color_03" color="03" yAxis="left" />
        <Chart.Bar id="color_04" color="04" yAxis="left" />
        <Chart.Bar id="color_05" color="05" yAxis="left" />
        <Chart.Bar id="color_06" color="06" yAxis="left" />
        <Chart.Bar id="color_07" color="07" yAxis="left" />
        <Chart.Bar id="color_08" color="08" yAxis="left" />
        <Chart.Bar id="color_09" color="09" yAxis="left" />
        <Chart.Bar id="color_10" color="10" yAxis="left" />
        <Chart.Bar id="color_11" color="11" yAxis="left" />
        <Chart.Bar id="color_12" color="12" yAxis="left" />
      </Chart>
    </Flex>
  );
}
