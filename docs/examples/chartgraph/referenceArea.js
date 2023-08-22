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
    {
      name: 'D',
      'Series_01': 400,
    },
    {
      name: 'E',
      'Series_01': 500,
    },
  ];

  return (
    <ChartGraph
      accessibilityLabel="Example of chart with reference areas"
      visualPatternSelected="disabled"
      onVisualPatternChange={() => {}}
      type="line"
      data={data}
      referenceAreas={[
        {
          id: 'ExampleBD',
          label: 'ExampleBD',
          x1: 'A',
          x2: 'C',
          yAxisId: 'left',
          y1: 300,
          y2: 600,
        },
        {
          id: 'ExampleFG',
          label: 'ExampleFG',
          x1: 'C',
          x2: 'E',
          yAxisId: 'left',
          y1: 300,
          y2: 0,
        },
      ]}
      elements={[{ type: 'line', id: 'Series_01' }]}
    />
  );
}
