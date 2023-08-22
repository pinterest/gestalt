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
      'Series_03': 100,
    },
    {
      name: 'B',
      'Series_01': 200,
      'Series_02': 200,
      'Series_03': 200,
    },
  ];

  return (
    <ChartGraph
      accessibilityLabel="Example of chart with stacked bars"
      visualPatternSelected={visualPatternSelected}
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
      }
      type="bar"
      legend="none"
      initialTicks={3}
      data={data}
      stacked
      elements={[
        { type: 'bar', id: 'Series_01' },
        { type: 'bar', id: 'Series_02' },
        { type: 'bar', id: 'Series_03' },
      ]}
    />
  );
}
