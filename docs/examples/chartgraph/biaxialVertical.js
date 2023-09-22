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
      'Series_02': 2000,
    },
    {
      name: 'B',
      'Series_01': 200,
      'Series_02': 3000,
    },
    {
      name: 'C',
      'Series_01': 300,
      'Series_02': 4000,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <RadioGroup legend="ChartGraph type" direction="row" id="vertical">
        <RadioGroup.RadioButton
          checked={type === 'bar'}
          id="vertical-bar"
          label="Bar"
          name="bar"
          onChange={() => setType('bar')}
          value="bar"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'line'}
          id="vertical-line"
          label="Line"
          name="line"
          onChange={() => setType('line')}
          value="line"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'combo'}
          id="vertical-combo"
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
        accessibilityLabel="Example of vertical biaxial chart"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        layout="verticalBiaxial"
        type={type}
        data={data}
        elements={[
          {
            type: type === 'combo' ? 'bar' : type,
            id: 'Series_01',
            axis: 'left',
          },
          {
            type: type === 'combo' ? 'line' : type,
            id: 'Series_02',
            axis: 'right',
          },
        ]}
      />
    </Flex>
  );
}
