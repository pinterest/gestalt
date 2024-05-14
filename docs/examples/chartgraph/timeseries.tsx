import { useState } from 'react';
import { FixedZIndex, Flex, RadioGroup } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');
  const [type, setType] = useState('line');

  const data = [
    { name: new Date(2023, 0, 1).getTime(), 'Series_01': 1000, 'Series_02': 100 },
    { name: new Date(2023, 0, 2).getTime(), 'Series_01': 1005, 'Series_02': 200 },
    { name: new Date(2023, 0, 3).getTime(), 'Series_01': 1003, 'Series_02': 150 },
    { name: new Date(2023, 0, 4).getTime(), 'Series_01': 1100, 'Series_02': 130 },
    { name: new Date(2023, 0, 5).getTime(), 'Series_01': 1030, 'Series_02': 147 },
    { name: new Date(2023, 0, 6).getTime(), 'Series_01': 1089, 'Series_02': 189 },
    { name: new Date(2023, 0, 7).getTime(), 'Series_01': 1065, 'Series_02': 118 },
    { name: new Date(2023, 0, 8).getTime(), 'Series_01': 1090, 'Series_02': 177 },
  ];

  return (
    <Flex direction="column" gap={2} height="100%" width="100%">
      <RadioGroup direction="row" id="timeseries" legend="ChartGraph type">
        <RadioGroup.RadioButton
          checked={type === 'bar'}
          id="timeseries-bar"
          label="Bar"
          name="bar"
          onChange={() => setType('bar')}
          size="sm"
          value="bar"
        />
        <RadioGroup.RadioButton
          checked={type === 'line'}
          id="timeseries-line"
          label="Line"
          name="line"
          onChange={() => setType('line')}
          size="sm"
          value="line"
        />
        <RadioGroup.RadioButton
          checked={type === 'combo'}
          id="timeseries-combo"
          label="Combo"
          name="combo"
          onChange={() => setType('combo')}
          size="sm"
          value="combo"
        />
      </RadioGroup>
      <ChartGraph
        accessibilityLabel="Example of time series chart"
        data={data}
        elements={[
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"line" | "bar"'.
          { type: type === 'combo' ? 'bar' : type, id: 'Series_01' },
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"line" | "bar"'.
          { type: type === 'combo' ? 'line' : type, id: 'Series_02' },
        ]}
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
        }}
        title="ChartGraph"
        titleDisplay="hidden"
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"line" | "bar" | "combo" | undefined'.
        type={type}
        // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
        visualPatternSelected={visualPatternSelected}
      />
    </Flex>
  );
}
