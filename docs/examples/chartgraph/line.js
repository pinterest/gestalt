// @flow strict
import { type Node } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
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
    <ChartGraph
      accessibilityLabel="Example of line chart"
      visualPatternSelected="disabled"
      onVisualPatternChange={() => {}}
      initialTicks={3}
      type="line"
      legend="none"
      data={data}
      elements={[{ type: 'line', id: 'Series_01' }]}
    />
  );
}
