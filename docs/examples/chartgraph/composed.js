// @flow strict
import { type Node, useState } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'A',
      'Series_01': 100,
      'Series_02': 100,
    },
    {
      name: 'B',
      'Series_01': 200,
      'Series_02': 200,
    },
    {
      name: 'C',
      'Series_01': 300,
      'Series_02': 300,
    },
  ];

  return (
    <ChartGraph
      accessibilityLabel="Example of composed chart"
      visualPatternSelected={visualPatternSelected}
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
      }
      type="composed"
      initialTicks={3}
      legend="none"
      data={data}
      elements={[
        { type: 'bar', id: 'Series_01' },
        { type: 'line', id: 'Series_02' },
      ]}
    />
  );
}
