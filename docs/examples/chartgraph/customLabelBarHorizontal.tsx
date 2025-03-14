import { useState } from 'react';
import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: 'Cars',
      Price: 1000,
    },
    {
      name: 'Decor',
      Price: 800,
    },
    {
      name: 'Make up',
      Price: 500,
    },
  ];

  return (
    <Flex direction="column" gap={2} height="100%" width="100%">
      <ChartGraph
        accessibilityLabel="Example of a vertical bar chart"
        // @ts-expect-error - TS2322 - Type '{ name: string; Impressions: number; CPM: number; CPC: number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
        data={data}
        elements={[{ type: 'bar', id: 'Price' }]}
        layout="horizontal"
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        range={['auto', 'auto']}
        renderLabel={({ x, y, width, height, value, index }) => (
          <ChartGraph.Label
            height={height}
            icon={index === 1 ? 'ribbon' : undefined}
            layout="horizontal"
            size={24}
            value={value}
            width={width}
            x={x}
            y={y}
          />
        )}
        title="Age"
        type="bar"
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
        visualPatternSelected={visualPatternSelected}
      />
    </Flex>
  );
}
