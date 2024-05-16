import { ReactNode, useState } from 'react';
import { FixedZIndex, Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: new Date(2023, 0, 1).getTime(),
      'Awareness': 5000,
      'Consideration': 1000,
      'Catalog sales': 4000,
      'Conversions': 2500,
    },
    {
      name: new Date(2023, 1, 1).getTime(),
      'Awareness': 4000,
      'Consideration': 5000,
      'Catalog sales': 1000,
      'Conversions': 2500,
    },
    {
      name: new Date(2023, 2, 1).getTime(),
      'Awareness': 2500,
      'Consideration': 5000,
      'Catalog sales': 1000,
      'Conversions': 4000,
    },
    {
      name: new Date(2023, 3, 1).getTime(),
      'Awareness': 2500,
      'Consideration': 4000,
      'Catalog sales': 1000,
      'Conversions': 5000,
    },
  ];

  return (
    <Flex direction="column" gap={2} height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="Example of stacked bars chart"
        data={data}
        elements={[
          { type: 'bar', id: 'Awareness' },
          { type: 'bar', id: 'Consideration' },
          { type: 'bar', id: 'Catalog sales' },
          { type: 'bar', id: 'Conversions' },
        ]}
        modalZIndex={new FixedZIndex(11)}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        range={{
          xAxisBottom: ['auto', 'auto'],
        }}
        stacked
        tickFormatter={{
          yAxisLeft: (value) => `${value / 1000}K`,
          timeseries: (date) =>
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
              date,
            )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        }}
        title="508 campaigns"
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
        visualPatternSelected={visualPatternSelected}
      />
    </Flex>
  );
}
