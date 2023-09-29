// @flow strict
import { type Node, useState } from 'react';
import { Flex, RadioGroup } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
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
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <RadioGroup legend="ChartGraph type" direction="row" id="timeseries">
        <RadioGroup.RadioButton
          checked={type === 'bar'}
          id="timeseries-bar"
          label="Bar"
          name="bar"
          onChange={() => setType('bar')}
          value="bar"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'line'}
          id="timeseries-line"
          label="Line"
          name="line"
          onChange={() => setType('line')}
          value="line"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'combo'}
          id="timeseries-combo"
          label="combo"
          name="combo"
          onChange={() => setType('combo')}
          value="combo"
          size="sm"
        />
      </RadioGroup>
      <ChartGraph
        title="ChartGraph"
        titleDisplay="hidden"
        accessibilityLabel="Example of time series chart"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        data={data}
        range={{
          xAxisBottom: ['auto', 'auto'],
        }}
        elements={[
          { type: type === 'combo' ? 'bar' : type, id: 'Series_01' },
          { type: type === 'combo' ? 'line' : type, id: 'Series_02' },
        ]}
        type={type}
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
