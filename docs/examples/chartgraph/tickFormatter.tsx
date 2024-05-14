import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const data = [
    {
      name: 'A',
      'Series_01': 1000300,
    },
    {
      name: 'B',
      'Series_01': 2000600,
    },
    {
      name: 'C',
      'Series_01': 3001200,
    },
  ];

  return (
    <ChartGraph
      accessibilityLabel="Example of Bar chart"
      // @ts-expect-error - TS2322 - Type '{ name: string; Series_01: number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
      data={data}
      elements={[{ type: 'bar', id: 'Series_01' }]}
      legend="none"
      onVisualPatternChange={() => {}}
      tickFormatter={{ yAxisLeft: (value) => `${value / 1000000}M` }}
      title="ChartGraph"
      titleDisplay="hidden"
      type="bar"
      visualPatternSelected="disabled"
    />
  );
}
