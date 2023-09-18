// @flow strict
import { type Node, useState } from 'react';
import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    { name: new Date(2023, 0, 1).getTime(), 'California': 1500000, 'Arizona': 500000 },
    { name: new Date(2023, 1, 2).getTime(), 'California': 1000000, 'Arizona': 400000 },
    { name: new Date(2023, 2, 3).getTime(), 'California': 1500000, 'Arizona': 500000 },
    { name: new Date(2023, 3, 4).getTime(), 'California': 1000000, 'Arizona': 400000 },
    { name: new Date(2023, 4, 5).getTime(), 'California': 1500000, 'Arizona': 500000 },
    { name: new Date(2023, 5, 6).getTime(), 'California': 1000000, 'Arizona': 400000 },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        title="Average spend by region"
        accessibilityLabel="Example of chart with tooltip"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
        }
        data={data}
        elements={[
          { type: 'bar', id: 'California' },
          { type: 'bar', id: 'Arizona' },
        ]}
        type="bar"
        tickFormatter={{
          yAxisLeft: (value) => {
            if (value >= 1000000) return `${value / 1000000}m`;
            if (value >= 1000) return `${value / 1000}k`;
            return value;
          },
          timeseries: (date) =>
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
              date,
            )} ${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        }}
      />
    </Flex>
  );
}
