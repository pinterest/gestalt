// @flow strict
import { type Node, useState } from 'react';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');

  const data = [
    {
      name: new Date(2023, 0, 1).getTime(),
      'Paid 10% per click on average 10% per click on average': 1000000,
      'Organic': 2000000,
      'Earned': 200000,
      'Converted': 100000,
    },
    {
      name: new Date(2023, 1, 2).getTime(),
      'Paid 10% per click on average': 2000000,
      'Organic': 2000000,
      'Earned': 400000,
      'Converted': 1900000,
    },
    {
      name: new Date(2023, 2, 3).getTime(),
      'Paid 10% per click on average': 3000000,
      'Organic': 5000000,
      'Earned': 600000,
      'Converted': 1500000,
    },
    {
      name: new Date(2023, 3, 4).getTime(),
      'Paid 10% per click on average': 2000000,
      'Organic': 3000000,
      'Earned': 700000,
      'Converted': 700000,
    },
    {
      name: new Date(2023, 4, 5).getTime(),
      'Paid 10% per click on average': 4000000,
      'Organic': 4000000,
      'Earned': 500000,
      'Converted': 1500000,
    },
    {
      name: new Date(2023, 5, 6).getTime(),
      'Paid 10% per click on average': 1000000,
      'Organic': 7000000,
      'Earned': 200000,
      'Converted': 4000000,
    },
    {
      name: new Date(2023, 6, 7).getTime(),
      'Paid 10% per click on average': 5000000,
      'Organic': 6000000,
      'Earned': 500000,
      'Converted': 1500000,
    },
    {
      name: new Date(2023, 7, 8).getTime(),
      'Paid 10% per click on average': 6000000,
      'Organic': 2000000,
      'Earned': 200000,
      'Converted': 1500000,
    },
    {
      name: new Date(2023, 8, 8).getTime(),
      'Paid 10% per click on average': 4000000,
      'Organic': 4000000,
      'Earned': 600000,
      'Converted': 2000000,
    },
    {
      name: new Date(2023, 9, 8).getTime(),
      'Paid 10% per click on average': 10000000,
      'Organic': 5000000,
      'Earned': 700000,
      'Converted': 500000,
    },
    {
      name: new Date(2023, 10, 8).getTime(),
      'Paid 10% per click on average': 4000000,
      'Organic': 5500000,
      'Earned': 100000,
      'Converted': 7000000,
    },
    {
      name: new Date(2023, 11, 8).getTime(),
      'Paid 10% per click on average': 3000000,
      'Organic': 7000000,
      'Earned': 200000,
      'Converted': 3000000,
    },
  ];

  return (
    <ChartGraph
      title="Engagement rate"
      accessibilityLabel="Engagement rate (example)"
      visualPatternSelected={visualPatternSelected}
      onVisualPatternChange={() =>
        setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
      }
      initialTicks={3}
      type="line"
      range={{
        xAxisBottom: ['auto', 'auto'],
      }}
      layout="vertical"
      data={data}
      elements={[
        { type: 'line', id: 'Paid 10% per click on average' },
        { type: 'line', id: 'Organic' },
        { type: 'line', id: 'Earned' },
        { type: 'line', id: 'Converted' },
      ]}
      tickFormatter={{
        timeseries: (date) =>
          `${new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(date)}`,
      }}
    />
  );
}
