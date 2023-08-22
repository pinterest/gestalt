// @flow strict
import { type Node, useState } from 'react';
import { Flex, RadioGroup } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');
  const [type, setType] = useState('bar');

  const data = [
    {
      name: 'A',
      'Series_01': 100,
      'Series_02': 200,
      'Series_03': 300,
    },
    {
      name: 'B',
      'Series_01': 200,
      'Series_02': 300,
      'Series_03': 400,
    },
    {
      name: 'C',
      'Series_01': 300,
      'Series_02': 400,
      'Series_03': 500,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <RadioGroup legend="ChartGraph type" direction="row" id="noTooltip">
        <RadioGroup.RadioButton
          checked={type === 'bar'}
          id="noTooltip-bar"
          label="Bar"
          name="bar"
          onChange={() => setType('bar')}
          value="bar"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'line'}
          id="noTooltip-line"
          label="Line"
          name="line"
          onChange={() => setType('line')}
          value="line"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'composed'}
          id="noTooltip-composed"
          label="Composed"
          name="composed"
          onChange={() => setType('composed')}
          value="composed"
          size="sm"
        />
      </RadioGroup>
      <ChartGraph
        accessibilityLabel="Example of chart with tooltip"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
        }
        initialTicks={3}
        type={type}
        legend="none"
        data={data}
        renderTooltip="none"
        elements={[
          {
            type: type === 'composed' ? 'bar' : type,
            id: 'Series_01',
          },
          {
            type: type === 'composed' ? 'line' : type,
            id: 'Series_02',
          },
          {
            type: type === 'composed' ? 'line' : type,
            id: 'Series_03',
            precision: 'estimate',
          },
        ]}
      />
    </Flex>
  );
}
