// @flow strict
import { type Node, useState } from 'react';
import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'Gen Z',
      'Users': 100,
      'Engagement': 200,
    },
    {
      name: 'Millenials',
      'Users': 200,
      'Engagement': 300,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        accessibilityLabel="Example controlled component with bars"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        type="bar"
        data={data}
        elements={[
          { type: 'bar', id: 'Users' },
          {
            type: 'bar',
            id: 'Engagement',
          },
        ]}
      />
    </Flex>
  );
}
