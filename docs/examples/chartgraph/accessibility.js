// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): ReactNode {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'A',
      'Series_01': 50,
      'Series_02': 100,
    },
    {
      name: 'B',
      'Series_01': 100,
      'Series_02': 200,
    },
    {
      name: 'C',
      'Series_01': 250,
      'Series_02': 300,
    },
  ];

  return (
    <ChartGraph
      accessibilityLabel="Example of Bar chart"
      visualPatternSelected={visualPatternSelected}
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
      }
      type="bar"
      title="ChartGraph"
      titleDisplay="hidden"
      data={data}
      elements={[
        { type: 'bar', id: 'Series_01' },
        { type: 'bar', id: 'Series_02' },
      ]}
    />
  );
}
