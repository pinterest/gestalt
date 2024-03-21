// @flow strict
import { type Node as ReactNode } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): ReactNode {
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
      data={data}
      elements={[{ type: 'bar', id: 'Series_01' }]}
      legend="none"
      onVisualPatternChange={() => {}}
      tickFormatter={{ yAxisLeft: (value) => `${value / 1000000}M` }}
      title="ChartGraph"
      titleDisplay="hidden"
      type="bar"
      visualPatternSelected="disabled"
    />
  );
}
