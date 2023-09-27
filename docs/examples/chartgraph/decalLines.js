// @flow strict
import { type Node, useState } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('visualPattern');

  const data = [
    {
      name: new Date(2023, 1, 1).getTime(),
      'Color_01': 50,
      'Color_02': 100,
      'Color_03': 150,
      'Color_04': 200,
      'Color_05': 250,
      'Color_06': 300,
    },
    {
      name: new Date(2023, 5, 15).getTime(),
      'Color_01': 100,
      'Color_02': 150,
      'Color_03': 200,
      'Color_04': 250,
      'Color_05': 300,
      'Color_06': 350,
    },
    {
      name: new Date(2023, 10, 1).getTime(),
      'Color_01': 150,
      'Color_02': 200,
      'Color_03': 250,
      'Color_04': 300,
      'Color_05': 350,
      'Color_06': 400,
    },
  ];

  return (
    <ChartGraph
      title="ChartGraph"
      titleDisplay="hidden"
      accessibilityLabel="Example of chart with decal pattern in lines"
      visualPatternSelected={visualPatternSelected}
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
      }
      type="line"
      tickFormatter={{
        timeseries: (date) =>
          `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
            date,
          )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
      }}
      range={{ xAxisBottom: [new Date(2023, 0, 1).getTime(), new Date(2023, 11, 1).getTime()] }}
      data={data}
      elements={[
        { type: 'line', id: 'Color_01' },
        { type: 'line', id: 'Color_02' },
        { type: 'line', id: 'Color_03' },
        { type: 'line', id: 'Color_04' },
        { type: 'line', id: 'Color_05' },
        { type: 'line', id: 'Color_06' },
      ]}
    />
  );
}
