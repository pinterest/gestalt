// @flow strict
import { type Node, useState } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('accessible');

  const data = [
    {
      name: 'A',
      'color_01': 100,
      'color_02': 100,
      'color_03': 100,
      'color_04': 100,
      'color_05': 100,
      'color_06': 100,
      'color_07': 100,
      'color_08': 100,
      'color_09': 100,
      'color_10': 100,
      'color_11': 100,
      'color_12': 100,
    },
  ];

  return (
    <ChartGraph
      accessibilityLabel="Example of chart with decal pattern in bars"
      visualPatternSelected={visualPatternSelected}
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
      }
      type="bar"
      data={data}
      elements={[
        { type: 'bar', id: 'color_01' },
        { type: 'bar', id: 'color_02' },
        { type: 'bar', id: 'color_03' },
        { type: 'bar', id: 'color_04' },
        { type: 'bar', id: 'color_05' },
        { type: 'bar', id: 'color_06' },
        { type: 'bar', id: 'color_07' },
        { type: 'bar', id: 'color_08' },
        { type: 'bar', id: 'color_09' },
        { type: 'bar', id: 'color_10' },
        { type: 'bar', id: 'color_11' },
        { type: 'bar', id: 'color_12' },
      ]}
    />
  );
}
