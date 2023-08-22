// @flow strict
import { type Node } from 'react';
import { Text, Button, Flex } from 'gestalt';
import { Chart } from 'gestalt-datepicker';

export default function Example(): Node {
  const [biaxial, setBiaxial] = useState(false);
  const [type, setType] = useState('bar');

  const data = [
    {
      name: 'A',
      bar1: 2400,
      bar2: 2400,
      bar3: 2400,
    },
    {
      name: 'B',
      bar1: 2400,
      bar2: 2400,
      bar3: 2400,
    },
    {
      name: 'C',
      bar1: 2400,
      bar2: 9800,
      bar3: 2400,
    },
    {
      name: 'D',
      bar1: 2400,
      bar2: 2400,
      bar3: 2400,
    },
    {
      name: 'E',
      bar1: 2400,
      bar2: 2400,
      bar3: 2400,
    },
    {
      name: 'F',
      bar1: 2400,
      bar2: 2400,
      bar3: 2400,
    },
    {
      name: 'G',
      bar1: 2400,
      bar2: 2400,
      bar3: 2400,
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
        renderTooltip={({ label, payload }) => (
          <Flex direction="column" gap={2}>
            {/* <Text>{JSON.stringify(payload)}</Text> */}
            <Text>{label}</Text>
          </Flex>
        )}
      />
    </Flex>
  );
}
