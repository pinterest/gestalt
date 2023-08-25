// @flow strict
import { type Node, useState } from 'react';
import { Button, Flex, Text } from 'gestalt';
import { Chart } from 'gestalt-charts';

export default function Example(): Node {
  const [biaxial, setBiaxial] = useState(false);
  const [type, setType] = useState('bar');

  const data = [
    {
      name: 'A',
      '01': 2400,
      '02': 2400,
      '03': 2400,
    },
    {
      name: 'B',
      '01': 2400,
      '02': 2400,
      '03': 2400,
    },
    {
      name: 'C',
      '01': 2400,
      '02': 9800,
      '03': 2400,
    },
    {
      name: 'D',
      '01': 2400,
      '02': 2400,
      '03': 2400,
    },
    {
      name: 'E',
      '01': 2400,
      '02': 2400,
      '03': 2400,
    },
    {
      name: 'F',
      '01': 2400,
      '02': 2400,
      '03': 2400,
    },
    {
      name: 'G',
      '01': 2400,
      '02': 2400,
      '03': 2400,
    },
  ];

  return (
    <Flex direction="column" width="100%" height="100%">
      <Button
        text={type === 'bar' ? 'change to Line' : 'change to Bar'}
        onClick={type === 'bar' ? () => setType('line') : () => setType('bar')}
      />
      <Button
        text={biaxial ? 'change to axial' : 'change to biaxial'}
        onClick={() => setBiaxial((value) => !value)}
      />
      <Chart
        biaxial={biaxial}
        type={type}
        data={data}
        // renderTooltip={({ label, payload }) => (
        renderTooltip={({ label }) => (
          <Flex direction="column" gap={2}>
            {/* <Text>{JSON.stringify(payload)}</Text> */}
            <Text>{label}</Text>
          </Flex>
        )}
      >
        <Chart.Bar id="01" color="01" yAxis="left" />
        <Chart.Bar id="02" color="02" yAxis="left" />
        <Chart.Bar id="02" color="02" yAxis="left" />
      </Chart>
    </Flex>
  );
}
