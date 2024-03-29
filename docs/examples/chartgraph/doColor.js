// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { FixedZIndex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): ReactNode {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    { name: new Date(2023, 0, 1).getTime(), 'Paid': 3000, 'Organic': 200, 'Earned': 2050 },
    { name: new Date(2023, 1, 2).getTime(), 'Paid': 2003, 'Organic': 200, 'Earned': 1060 },
    { name: new Date(2023, 2, 3).getTime(), 'Paid': 3000, 'Organic': 500, 'Earned': 1050 },
    { name: new Date(2023, 3, 4).getTime(), 'Paid': 2000, 'Organic': 300, 'Earned': 1070 },
    { name: new Date(2023, 4, 5).getTime(), 'Paid': 4000, 'Organic': 400, 'Earned': 3050 },
    { name: new Date(2023, 5, 6).getTime(), 'Paid': 3005, 'Organic': 70, 'Earned': 2080 },
    { name: new Date(2023, 6, 7).getTime(), 'Paid': 5000, 'Organic': 600, 'Earned': 1050 },
    { name: new Date(2023, 7, 8).getTime(), 'Paid': 6000, 'Organic': 200, 'Earned': 2040 },
    { name: new Date(2023, 8, 8).getTime(), 'Paid': 4000, 'Organic': 400, 'Earned': 1050 },
    { name: new Date(2023, 9, 8).getTime(), 'Paid': 3005, 'Organic': 500, 'Earned': 1080 },
    { name: new Date(2023, 10, 8).getTime(), 'Paid': 4000, 'Organic': 550, 'Earned': 2050 },
    { name: new Date(2023, 11, 8).getTime(), 'Paid': 3000, 'Organic': 700, 'Earned': 1050 },
  ];

  return (
    <ChartGraph
      accessibilityLabel="Pin clicks over time (example)"
      data={data}
      elements={[
        { type: 'line', id: 'Paid' },
        { type: 'line', id: 'Organic' },
        { type: 'line', id: 'Earned' },
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
        timeseries: (date) =>
          `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
            date,
          )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        yAxisLeft: (value) => `${value / 1000}K`,
      }}
      title="Pin clicks over time"
      type="line"
      visualPatternSelected={visualPatternSelected}
    />
  );
}
