// @flow strict
import { type Node, useState } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('visualPattern');

  const data = [
    {
      name: 'A',
      'Color_01': 90,
      'Color_02': 90,
      'Color_03': 90,
      'Color_04': 90,
      'Color_05': 90,
      'Color_06': 90,
    },
  ];

  return (
    <ChartGraph
      accessibilityLabel="Example of chart with decal pattern in bars"
      visualPatternSelected={visualPatternSelected}
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
      }
      range={[0, 100]}
      type="bar"
      data={data}
      elements={[
        { type: 'bar', id: 'Color_01' },
        { type: 'bar', id: 'Color_02' },
        { type: 'bar', id: 'Color_03' },
        { type: 'bar', id: 'Color_04' },
        { type: 'bar', id: 'Color_05' },
        { type: 'bar', id: 'Color_06' },
      ]}
    />
  );
}
