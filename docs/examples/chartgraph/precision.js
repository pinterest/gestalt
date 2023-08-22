// @flow strict
import { type Node } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    {
      name: 'A',
      'Exact values': 200,
      'Estimate values': 100,
    },
    {
      name: 'B',
      'Exact values': 300,
      'Estimate values': 200,
    },
    {
      name: 'C',
      'Exact values': 500,
      'Estimate values': 400,
    },
    {
      name: 'D',
      'Exact values': 300,
      'Estimate values': 200,
    },
    {
      name: 'E',
      'Exact values': 200,
      'Estimate values': 100,
    },
  ];

  return (
    <ChartGraph
      accessibilityLabel="Example of chart with precision exact and estimate lines"
      visualPatternSelected="disabled"
      onVisualPatternChange={() => {}}
      type="line"
      data={data}
      elements={[
        { type: 'line', id: 'Exact values', precision: 'exact' },
        { type: 'line', id: 'Estimate values', precision: 'estimate' },
      ]}
    />
  );
}
