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
      accessibilityLabel="Example of Bar chart"
      title="ChartGraph"
      titleDisplay="hidden"
      visualPatternSelected="disabled"
      onVisualPatternChange={() => {}}
      type="bar"
      legend="none"
      data={data}
      initialTicks={3}
      elements={[{ type: 'bar', id: 'Series_01' }]}
    />
  );
}
