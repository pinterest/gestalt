// @flow strict
import { type Node } from 'react';
import { Flex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const data = [
    { name: new Date(2023, 0, 1).getTime(), 'Actual data': 1000 },
    { name: new Date(2023, 1, 1).getTime(), 'Actual data': 1567 },
    { name: new Date(2023, 2, 1).getTime(), 'Actual data': 1005 },
    { name: new Date(2023, 3, 1).getTime(), 'Actual data': 1003 },
    { name: new Date(2023, 4, 1).getTime(), 'Actual data': 1100 },
    { name: new Date(2023, 5, 1).getTime(), 'Actual data': 1030 },
    { name: new Date(2023, 6, 1).getTime(), 'Actual data': 1089 },
    { name: new Date(2023, 7, 1).getTime(), 'Actual data': 1065, 'Forecast': 1065 },
    { name: new Date(2023, 8, 1).getTime(), 'Forecast': 1089 },
    { name: new Date(2023, 9, 1).getTime(), 'Forecast': 1030 },
    { name: new Date(2023, 10, 1).getTime(), 'Forecast': 1990 },
    { name: new Date(2023, 11, 1).getTime(), 'Forecast': 2034 },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <ChartGraph
        title="Forecast for 2023"
        accessibilityLabel="Example of time series chart"
        visualPatternSelected="disabled"
        onVisualPatternChange={() => {}}
        data={data}
        range={{
          xAxisBottom: ['auto', 'auto'],
        }}
        elements={[
          { type: 'line', id: 'Actual data', precision: 'exact' },
          { type: 'line', id: 'Forecast', precision: 'estimate' },
        ]}
        type="line"
        tickFormatter={{
          timeseries: (date) =>
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
              date,
            )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        }}
      />
    </Flex>
  );
}
