// @flow strict
import { type Node, useState } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('accessible');

  const data = [
    {
      name: 'A',
      'color_01': 50,
      'color_02': 100,
      'color_03': 150,
      'color_04': 200,
      'color_05': 250,
      'color_06': 300,
      'color_07': 350,
      'color_08': 400,
      'color_09': 450,
      'color_10': 500,
      'color_11': 550,
      'color_12': 600,
    },
    {
      name: 'B',
      'color_01': 100,
      'color_02': 150,
      'color_03': 200,
      'color_04': 250,
      'color_05': 300,
      'color_06': 350,
      'color_07': 400,
      'color_08': 450,
      'color_09': 500,
      'color_10': 550,
      'color_11': 600,
      'color_12': 650,
    },
    {
      name: 'C',
      'color_01': 150,
      'color_02': 200,
      'color_03': 250,
      'color_04': 300,
      'color_05': 350,
      'color_06': 400,
      'color_07': 450,
      'color_08': 500,
      'color_09': 550,
      'color_10': 600,
      'color_11': 650,
      'color_12': 700,
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
        { type: 'line', id: 'color_01' },
        { type: 'line', id: 'color_02' },
        { type: 'line', id: 'color_03' },
        { type: 'line', id: 'color_04' },
        { type: 'line', id: 'color_05' },
        { type: 'line', id: 'color_06' },
        { type: 'line', id: 'color_07' },
        { type: 'line', id: 'color_08', color: '08' },
        { type: 'line', id: 'color_09', color: '09' },
        { type: 'line', id: 'color_10', color: '10' },
        { type: 'line', id: 'color_11', color: '11' },
        { type: 'line', id: 'color_12', color: '12', precision: 'estimate' },
      ]}
    />
  );
}
