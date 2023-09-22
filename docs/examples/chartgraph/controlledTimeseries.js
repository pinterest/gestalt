// @flow strict
import { type Node, useState } from 'react';
import { Flex, RadioGroup } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');
  const [type, setType] = useState('bar');

  const data = [
    { name: new Date(2023, 1, 1).getTime(), 'Gen Z': 100, 'Millenials': 300 },
    { name: new Date(2023, 1, 2).getTime(), 'Gen Z': 200, 'Millenials': 400 },
    { name: new Date(2023, 1, 3).getTime(), 'Gen Z': 300, 'Millenials': 500 },
    { name: new Date(2023, 1, 4).getTime(), 'Gen Z': 400, 'Millenials': 600 },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <RadioGroup legend="ChartGraph type" direction="row" id="controlledTimeseries">
        <RadioGroup.RadioButton
          checked={type === 'bar'}
          id="controlledTimeseries-bar"
          label="Bar"
          name="bar"
          onChange={() => setType('bar')}
          value="bar"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'line'}
          id="controlledTimeseries-line"
          label="Line"
          name="line"
          onChange={() => setType('line')}
          value="line"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'combo'}
          id="controlledTimeseries-combo"
          label="combo"
          name="combo"
          onChange={() => setType('combo')}
          value="combo"
          size="sm"
        />
      </RadioGroup>
      <ChartGraph
        accessibilityLabel="Example controlled component with bars"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        type={type}
        data={data}
        elements={[
          { type: type === 'combo' ? 'bar' : type, id: 'Gen Z' },
          {
            type: type === 'combo' ? 'line' : type,
            id: 'Millenials',
          },
        ]}
        tickFormatter={{
          timeseries: (date) =>
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date)}`,
          xAxisBottom: (date) =>
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
              date,
            )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        }}
        range={{
          xAxisBottom: ['auto', 'auto'],
        }}
      />
    </Flex>
  );
}
