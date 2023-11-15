// @flow strict
import { type Node as ReactNode } from 'react';
import { FixedZIndex } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): ReactNode {
  const data = [
    { name: new Date(2023, 0, 1).getTime(), 'Clicks': 0.01, 'Conversions': 0.02 },
    { name: new Date(2023, 1, 2).getTime(), 'Clicks': 0.02, 'Conversions': 0.023 },
    { name: new Date(2023, 2, 3).getTime(), 'Clicks': 0.03, 'Conversions': 0.05 },
    { name: new Date(2023, 3, 4).getTime(), 'Clicks': 0.025, 'Conversions': 0.03 },
    { name: new Date(2023, 4, 5).getTime(), 'Clicks': 0.04, 'Conversions': 0.04 },
    { name: new Date(2023, 5, 6).getTime(), 'Clicks': 0.045, 'Conversions': 0.07 },
    { name: new Date(2023, 6, 7).getTime(), 'Clicks': 0.05, 'Conversions': 0.06 },
    { name: new Date(2023, 7, 8).getTime(), 'Clicks': 0.06, 'Conversions': 0.02 },
    { name: new Date(2023, 8, 8).getTime(), 'Clicks': 0.04, 'Conversions': 0.04 },
    { name: new Date(2023, 9, 8).getTime(), 'Clicks': 0.075, 'Conversions': 0.05 },
    { name: new Date(2023, 10, 8).getTime(), 'Clicks': 0.04, 'Conversions': 0.055 },
    { name: new Date(2023, 11, 8).getTime(), 'Clicks': 0.03, 'Conversions': 0.07 },
  ];

  return (
    <ChartGraph
      title="Clicks compared to conversions"
      accessibilityLabel="Clicks compared to conversions (example)"
      visualPatternSelected="disabled"
      onVisualPatternChange={() => {}}
      type="combo"
      range={{
        xAxisBottom: ['auto', 'auto'],
      }}
      layout="verticalBiaxial"
      data={data}
      elements={[
        { type: 'bar', id: 'Clicks', axis: 'left' },
        { type: 'line', id: 'Conversions', axis: 'right' },
      ]}
      tickFormatter={{
        timeseries: (date) =>
          `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
            date,
          )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        yAxisLeft: (value) => `${value}%`,
        yAxisRight: (value) => `${value}%`,
        xAxisBottom: (date, index) => {
          if (index === 0) return 'Quarter 1';
          if (index === 3) return 'Quarter 2';
          if (index === 6) return 'Quarter 3';
          if (index === 9) return 'Quarter 4';
          return '';
        },
      }}
      modalZIndex={new FixedZIndex(11)}
    />
  );
}
