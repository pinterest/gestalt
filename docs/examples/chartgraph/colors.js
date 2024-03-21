// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): ReactNode {
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
          accessibilityLabel="Example of line chart color 01"
          data={data}
          description="Color 01"
          elements={[{ type: 'line', id: 'Series_01' }]}
          initialTicks={3}
          legend="none"
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
          }
          renderTooltip="none"
          title="ChartGraph A"
          type="line"
          visualPatternSelected={visualPatternSelected}
        />
        <ChartGraph
          accessibilityLabel="Example of line chart color 02"
          data={data}
          description="Color 02"
          elements={[{ type: 'line', id: 'Series_01', color: '02' }]}
          initialTicks={3}
          legend="none"
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
          }
          renderTooltip="none"
          title="ChartGraph B"
          type="line"
          visualPatternSelected={visualPatternSelected}
        />
      </Flex>
      <Flex>
        <ChartGraph
          accessibilityLabel="Example of line chart color 03"
          data={data}
          description="Color 03"
          elements={[{ type: 'line', id: 'Series_01', color: '03' }]}
          initialTicks={3}
          legend="none"
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
          }
          renderTooltip="none"
          title="ChartGraph C"
          type="line"
          visualPatternSelected={visualPatternSelected}
        />
        <ChartGraph
          accessibilityLabel="Example of line chart color 04"
          data={data}
          description="Color 04"
          elements={[{ type: 'line', id: 'Series_01', color: '04' }]}
          initialTicks={3}
          legend="none"
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
          }
          renderTooltip="none"
          title="ChartGraph D"
          type="line"
          visualPatternSelected={visualPatternSelected}
        />
      </Flex>
    </Flex>
  );
}
