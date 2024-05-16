import { ReactNode, useState } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
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
      // @ts-expect-error - TS2322 - Type '{ name: string; Color_01: number; Color_02: number; Color_03: number; Color_04: number; Color_05: number; Color_06: number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
      data={data}
      elements={[
        { type: 'bar', id: 'Color_01' },
        { type: 'bar', id: 'Color_02' },
        { type: 'bar', id: 'Color_03' },
        { type: 'bar', id: 'Color_04' },
        { type: 'bar', id: 'Color_05' },
        { type: 'bar', id: 'Color_06' },
      ]}
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
      }
      range={[0, 100]}
      title="ChartGraph"
      titleDisplay="hidden"
      type="bar"
      // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
      visualPatternSelected={visualPatternSelected}
    />
  );
}
