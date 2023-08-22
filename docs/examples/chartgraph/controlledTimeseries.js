// @flow strict
import { type Node, useState } from 'react';
import { Flex, RadioGroup, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');
  const [type, setType] = useState('bar');

  const data = [
    { name: new Date(2023, 1, 1).getTime(), 'Gen Z': 100, 'Millenials': 300 },
    { name: new Date(2023, 1, 2).getTime(), 'Gen Z': 200, 'Millenials': 400 },
    { name: new Date(2023, 1, 3).getTime(), 'Gen Z': 300, 'Millenials': 500 },
    { name: new Date(2023, 1, 4).getTime(), 'Gen Z': 400, 'Millenials': 600 },
    // { name: new Date(2023, 1, 5).getTime(), 'Gen Z': 400, 'Millenials': 600 },
    // { name: new Date(2023, 1, 6).getTime(), 'Gen Z': 400, 'Millenials': 600 },
    // { name: new Date(2023, 1, 7).getTime(), 'Gen Z': 400, 'Millenials': 600 },
    // { name: new Date(2023, 1, 8).getTime(), 'Gen Z': 400, 'Millenials': 600 },
    // { name: new Date(2023, 1, 9).getTime(), 'Gen Z': 400, 'Millenials': 600 },
    // { name: new Date(2023, 1, 10).getTime(), 'Gen Z': 400, 'Millenials': 600 },
    // { name: new Date(2023, 1, 11).getTime(), 'Gen Z': 400, 'Millenials': 600 },
    // { name: new Date(2023, 1, 12).getTime(), 'Gen Z': 400, 'Millenials': 600 },
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
          checked={type === 'composed'}
          id="controlledTimeseries-composed"
          label="Composed"
          name="composed"
          onChange={() => setType('composed')}
          value="composed"
          size="sm"
        />
      </RadioGroup>
      <ChartGraph
        accessibilityLabel="Example controlled component with bars"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
        }
        type={type}
        data={data}
        elements={[
          { type: type === 'composed' ? 'bar' : type, id: 'Gen Z' },
          {
            type: type === 'composed' ? 'line' : type,
            id: 'Millenials',
          },
        ]}
        variant="timeseries"
        tickFormatter={{
          xAxisBottom: (date) =>
            `${new Intl.DateTimeFormat('en-US', { month: 'short' }).format(
              date,
            )}-${new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(date)}`,
        }}
        range={{
          xAxisBottom: ['auto', 'auto'],
        }}
        renderTooltip={({ active, label, payload }) =>
          active && Array.isArray(payload) ? (
            <Flex direction="column" gap={2}>
              <Flex.Item>
                {payload.map(
                  (payloadData: {|
                    dataKey: string,
                    color?: ?string,
                    fill?: ?string,
                    isLegend?: boolean,
                    legendType?: 'line' | 'rect',
                    name: string,
                    stroke?: ?string,
                    strokeDasharray?: ?(string | number),
                    value: number,
                  |}) => (
                    <Flex key={payloadData.name} alignItems="center" gap={2}>
                      <ChartGraph.LegendIcon payloadData={payloadData} />
                      <Flex.Item flex="grow">
                        <Text size="100">{payloadData.name}</Text>
                      </Flex.Item>
                      <Text weight="bold" size="200">
                        {payloadData.value}
                      </Text>
                    </Flex>
                  ),
                )}
              </Flex.Item>
              <Text color="subtle" size="100">
                {typeof label === 'number' ? new Intl.DateTimeFormat('en-US').format(label) : ''}
              </Text>
            </Flex>
          ) : null
        }
      />
    </Flex>
  );
}
