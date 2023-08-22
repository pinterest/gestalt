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
          title="ChartGraph B"
          description="Color 07"
          accessibilityLabel="Example of line chart color 07"
          visualPatternSelected={visualPatternSelected}
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
          }
          initialTicks={3}
          type="line"
          renderTooltip="none"
          legend="none"
          data={data}
          elements={[{ type: 'line', id: 'Series_01', color: '07' }]}
        />
      </Flex>
      <Flex>
        <ChartGraph
          title="ChartGraph C"
          description="Color 09"
          accessibilityLabel="Example of line chart color 09 "
          visualPatternSelected={visualPatternSelected}
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
          }
          initialTicks={3}
          type="line"
          renderTooltip="none"
          legend="none"
          data={data}
          elements={[{ type: 'line', id: 'Series_01', color: '09' }]}
        />
        <ChartGraph
          title="ChartGraph D"
          description="Color 12"
          accessibilityLabel="Example of line chart color 12"
          visualPatternSelected={visualPatternSelected}
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
          }
          initialTicks={3}
          type="line"
          renderTooltip="none"
          legend="none"
          data={data}
          elements={[{ type: 'line', id: 'Series_01', color: '12' }]}
        />
      </Flex>
    </Flex>
  );
}
