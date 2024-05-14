import { useState } from 'react';
import { FixedZIndex, Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'Quarter 1',
      'This year': 850000,
      'Profit': 870000,
      'Last year': 980000,
    },
    {
      name: 'Quarter 2',
      'This year': 800000,
      'Profit': 690000,
      'Last year': 590000,
    },
    {
      name: 'Quarter 3',
      'This year': 890000,
      'Profit': 850000,
      'Last year': 950000,
    },
    {
      name: 'Quarter 4',
      'This year': 870000,
      'Profit': 550000,
      'Last year': 830000,
    },
  ];

  return (
    <Flex direction="column" gap={2} height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="Example of combo chart"
        // @ts-expect-error - TS2322 - Type '{ name: string; 'This year': number; Profit: number; 'Last year': number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
        data={data}
        elements={[
          { type: 'bar', id: 'This year' },
          { type: 'bar', id: 'Profit' },
          { type: 'line', id: 'Last year' },
        ]}
        modalZIndex={new FixedZIndex(11)}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        tickFormatter={{
          yAxisLeft: (value) => {
            if (value >= 1000000) return `${value / 1000000}m`;
            if (value >= 1000) return `${value / 1000}k`;
            return value;
          },
        }}
        title="Product group sales:"
        type="combo"
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
        visualPatternSelected={visualPatternSelected}
      />
    </Flex>
  );
}
