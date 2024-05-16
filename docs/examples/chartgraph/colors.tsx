import { useState } from 'react';
import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'A',
      'Series_01': 100,
    },
    {
      name: 'B',
      'Series_01': 200,
    },
    {
      name: 'C',
      'Series_01': 300,
    },
  ];

  return (
    <Flex direction="column" width="100%" wrap>
      <Flex>
        <ChartGraph
          accessibilityLabel="Example of line chart color 01"
          // @ts-expect-error - TS2322 - Type '{ name: string; Series_01: number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
          data={data}
          description="Color 01"
          elements={[{ type: 'line', id: 'Series_01' }]}
          initialTicks={3}
          legend="none"
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
          }
          renderTooltip="none"
          title="ChartGraph A"
          type="line"
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
          visualPatternSelected={visualPatternSelected}
        />
        <ChartGraph
          accessibilityLabel="Example of line chart color 02"
          // @ts-expect-error - TS2322 - Type '{ name: string; Series_01: number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
          data={data}
          description="Color 02"
          elements={[{ type: 'line', id: 'Series_01', color: '02' }]}
          initialTicks={3}
          legend="none"
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
          }
          renderTooltip="none"
          title="ChartGraph B"
          type="line"
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
          visualPatternSelected={visualPatternSelected}
        />
      </Flex>
      <Flex>
        <ChartGraph
          accessibilityLabel="Example of line chart color 03"
          // @ts-expect-error - TS2322 - Type '{ name: string; Series_01: number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
          data={data}
          description="Color 03"
          elements={[{ type: 'line', id: 'Series_01', color: '03' }]}
          initialTicks={3}
          legend="none"
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
          }
          renderTooltip="none"
          title="ChartGraph C"
          type="line"
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
          visualPatternSelected={visualPatternSelected}
        />
        <ChartGraph
          accessibilityLabel="Example of line chart color 04"
          // @ts-expect-error - TS2322 - Type '{ name: string; Series_01: number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
          data={data}
          description="Color 04"
          elements={[{ type: 'line', id: 'Series_01', color: '04' }]}
          initialTicks={3}
          legend="none"
          onVisualPatternChange={() =>
            setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
          }
          renderTooltip="none"
          title="ChartGraph D"
          type="line"
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
          visualPatternSelected={visualPatternSelected}
        />
      </Flex>
    </Flex>
  );
}
