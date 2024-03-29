// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { FixedZIndex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): ReactNode {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    { name: new Date(2023, 0, 1).getTime(), 'Paid': 100, 'Organic': 200 },
    { name: new Date(2023, 1, 2).getTime(), 'Paid': 2003, 'Organic': 200 },
    { name: new Date(2023, 2, 3).getTime(), 'Paid': 300, 'Organic': 500 },
    { name: new Date(2023, 3, 4).getTime(), 'Paid': 200, 'Organic': 300 },
    { name: new Date(2023, 4, 5).getTime(), 'Paid': 400, 'Organic': 400 },
    { name: new Date(2023, 5, 6).getTime(), 'Paid': 1005, 'Organic': 70 },
    { name: new Date(2023, 6, 7).getTime(), 'Paid': 500, 'Organic': 600 },
    { name: new Date(2023, 7, 8).getTime(), 'Paid': 600, 'Organic': 200 },
    { name: new Date(2023, 8, 8).getTime(), 'Paid': 400, 'Organic': 400 },
    { name: new Date(2023, 9, 8).getTime(), 'Paid': 1005, 'Organic': 500 },
    { name: new Date(2023, 10, 8).getTime(), 'Paid': 400, 'Organic': 550 },
    { name: new Date(2023, 11, 8).getTime(), 'Paid': 300, 'Organic': 700 },
  ];

  return (
    <ChartGraph
      accessibilityLabel="Pin clicks over time (example)"
      data={data}
      elements={[
        { type: 'line', id: 'Paid' },
        { type: 'line', id: 'Organic' },
      ]}
      initialTicks={3}
      layout="vertical"
      modalZIndex={new FixedZIndex(11)}
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
      }
      range={{
        xAxisBottom: ['auto', 'auto'],
      }}
      tickFormatter={{
        yAxisLeft: (value) => `${value / 1000}K`,
        timeseries: (date) =>
          `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
            date,
          )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
      }}
      title="Pin clicks over time"
      type="line"
      visualPatternSelected={visualPatternSelected}
    />
  );
}
