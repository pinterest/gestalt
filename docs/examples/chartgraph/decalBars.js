// @flow strict
import { type Node, useState } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('accessible');

  const data = [
    {
      name: 'A',
      'color_01': 90,
      'color_02': 90,
      'color_03': 90,
      'color_04': 90,
      'color_05': 90,
      'color_06': 90,
    },
  ];

  return (
    <ChartGraph
      accessibilityLabel="Example of chart with decal pattern in bars"
      visualPatternSelected={visualPatternSelected}
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
      }
      range={[0, 100]}
      type="bar"
      data={data}
      elements={[
        { type: 'bar', id: 'color_01' },
        { type: 'bar', id: 'color_02' },
        { type: 'bar', id: 'color_03' },
        { type: 'bar', id: 'color_04' },
        { type: 'bar', id: 'color_05' },
        { type: 'bar', id: 'color_06' },
      ]}
    />
  );
}
