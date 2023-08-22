// @flow strict
import { type Node, useState } from 'react';
import { Flex, RadioGroup } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');
  const [type, setType] = useState('bar');
  const [legend, setLegend] = useState('none');

  const data = [
    {
      name: 'A',
      'Series_01': 0,
      'Series_02': 100,
    },
    {
      name: 'B',
      'Series_01': 100,
      'Series_02': 200,
    },
    {
      name: 'C',
      'Series_01': 200,
      'Series_02': 300,
    },
    {
      name: 'D',
      'Series_01': 300,
      'Series_02': 400,
    },
    {
      name: 'E',
      'Series_01': 400,
      'Series_02': 500,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <Flex width="100%" justifyContent="between" wrap>
        <RadioGroup legend="ChartGraph type" direction="row" id="legend-type">
          <RadioGroup.RadioButton
            checked={type === 'bar'}
            id="legend-type-bar"
            label="Bar"
            name="bar"
            onChange={() => setType('bar')}
            value="bar"
            size="sm"
          />
          <RadioGroup.RadioButton
            checked={type === 'line'}
            id="legend-type-line"
            label="Line"
            name="line"
            onChange={() => setType('line')}
            value="line"
            size="sm"
          />
          <RadioGroup.RadioButton
            checked={type === 'composed'}
            id="legend-type-composed"
            label="Composed"
            name="composed"
            onChange={() => setType('composed')}
            value="composed"
            size="sm"
          />
        </RadioGroup>
        <RadioGroup legend="Legend" direction="row" id="legend-legend">
          <RadioGroup.RadioButton
            checked={legend === 'auto'}
            id="legend-legend-auto"
            label="Auto"
            name="auto"
            onChange={() => setLegend('auto')}
            value="auto"
            size="sm"
          />
          <RadioGroup.RadioButton
            checked={legend === 'none'}
            id="legend-legend-none"
            label="None"
            name="none"
            onChange={() => setLegend('none')}
            value="none"
            size="sm"
          />
          <RadioGroup.RadioButton
            checked={legend === 'complete'}
            id="legend-legend-complete"
            label="Complete"
            name="complete"
            onChange={() => setLegend('complete')}
            value="complete"
            size="sm"
          />
        </RadioGroup>
      </Flex>

      <ChartGraph
        accessibilityLabel="Example of chart with visible legend"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
        }
        type={type}
        data={data}
        legend={legend}
        elements={[
          {
            type: type === 'composed' ? 'bar' : type,
            id: 'Series_01',
            precision: 'exact',
          },
          {
            type: type === 'composed' ? 'line' : type,
            id: 'Series_02',
            precision: 'estimate',
          },
        ]}
      />
    </Flex>
  );
}
