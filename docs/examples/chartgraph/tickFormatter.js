// @flow strict
import { type Node } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    {
      name: 'A',
      'Series_01': 1000300,
    },
    {
      name: 'B',
      'Series_01': 2000600,
    },
    {
      name: 'C',
      'Series_01': 3001200,
    },
  ];

  return (
    <ChartGraph
      accessibilityLabel="Example of Bar chart"
      visualPatternSelected="disabled"
      onVisualPatternChange={() => {}}
      type="bar"
      legend="none"
      data={data}
      tickFormatter={{ yAxisLeft: (value) => `${value / 1000000}M` }}
      elements={[{ type: 'bar', id: 'Series_01' }]}
    />
  );
}
