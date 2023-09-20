// @flow strict
import { type Node, useState } from 'react';
import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'A',
      'Series_01': 100,
    },
    {
      name: 'B',
      'Series_01': 200,
    },
    {
      name: 'C',
      'Series_01': 300,
    },
  ];

  return (
    <Flex direction="column" width="100%" wrap>
      <Flex>
        <ChartGraph
          title="ChartGraph A"
          description="Color 01"
          accessibilityLabel="Example of line chart color 01"
          visualPatternSelected={visualPatternSelected}
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
          }
          initialTicks={3}
          type="line"
          renderTooltip="none"
          legend="none"
          data={data}
          elements={[{ type: 'line', id: 'Series_01' }]}
        />
        <ChartGraph
          title="ChartGraph B"
          description="Color 02"
          accessibilityLabel="Example of line chart color 02"
          visualPatternSelected={visualPatternSelected}
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
          }
          initialTicks={3}
          type="line"
          renderTooltip="none"
          legend="none"
          data={data}
          elements={[{ type: 'line', id: 'Series_01', color: '02' }]}
        />
      </Flex>
      <Flex>
        <ChartGraph
          title="ChartGraph C"
          description="Color 03"
          accessibilityLabel="Example of line chart color 03"
          visualPatternSelected={visualPatternSelected}
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
          }
          initialTicks={3}
          type="line"
          renderTooltip="none"
          legend="none"
          data={data}
          elements={[{ type: 'line', id: 'Series_01', color: '03' }]}
        />
        <ChartGraph
          title="ChartGraph D"
          description="Color 04"
          accessibilityLabel="Example of line chart color 04"
          visualPatternSelected={visualPatternSelected}
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
          }
          initialTicks={3}
          type="line"
          renderTooltip="none"
          legend="none"
          data={data}
          elements={[{ type: 'line', id: 'Series_01', color: '04' }]}
        />
      </Flex>
    </Flex>
  );
}
