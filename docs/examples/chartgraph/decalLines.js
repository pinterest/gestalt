// @flow strict
import { type Node, useState } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('accessible');

  const data = [
    {
      name: 'A',
      'Color_01': 50,
      'Color_02': 100,
      'Color_03': 150,
      'Color_04': 200,
      'Color_05': 250,
      'Color_06': 300,
      'Color_07': 350,
      'Color_08': 400,
      'Color_09': 450,
      'Color_10': 500,
      'Color_11': 550,
      'Color_12': 600,
    },
    {
      name: 'B',
      'Color_01': 100,
      'Color_02': 150,
      'Color_03': 200,
      'Color_04': 250,
      'Color_05': 300,
      'Color_06': 350,
      'Color_07': 400,
      'Color_08': 450,
      'Color_09': 500,
      'Color_10': 550,
      'Color_11': 600,
      'Color_12': 650,
    },
    {
      name: 'C',
      'Color_01': 150,
      'Color_02': 200,
      'Color_03': 250,
      'Color_04': 300,
      'Color_05': 350,
      'Color_06': 400,
      'Color_07': 450,
      'Color_08': 500,
      'Color_09': 550,
      'Color_10': 600,
      'Color_11': 650,
      'Color_12': 700,
    },
  ];

  return (
    <ChartGraph
      accessibilityLabel="Example of chart with decal pattern in lines"
      visualPatternSelected={visualPatternSelected}
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
      }
      type="line"
      data={data}
      elements={[
        { type: 'line', id: 'Color_01' },
        { type: 'line', id: 'Color_02' },
        { type: 'line', id: 'Color_03' },
        { type: 'line', id: 'Color_04' },
        { type: 'line', id: 'Color_05' },
        { type: 'line', id: 'Color_06' },
        { type: 'line', id: 'Color_07' },
        { type: 'line', id: 'Color_08' },
        { type: 'line', id: 'Color_09' },
        { type: 'line', id: 'Color_10' },
        { type: 'line', id: 'Color_11' },
        { type: 'line', id: 'Color_12', precision: 'estimate' },
      ]}
    />
  );
}
