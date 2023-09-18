// @flow strict
import { type Node, useState } from 'react';
import { Flex, RadioGroup } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');
  const [type, setType] = useState('bar');

  const data = [
    {
      name: 'Gen Z',
      'Users': 100,
      'Engagement': 200,
    },
    {
      name: 'Millenials',
      'Users': 200,
      'Engagement': 300,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <RadioGroup legend="ChartGraph type" direction="row" id="controlledCategorical">
        <RadioGroup.RadioButton
          checked={type === 'bar'}
          id="controlledCategorical-bar"
          label="Bar"
          name="bar"
          onChange={() => setType('bar')}
          value="bar"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'line'}
          id="controlledCategorical-line"
          label="Line"
          name="line"
          onChange={() => setType('line')}
          value="line"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'combo'}
          id="controlledCategorical-combo"
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
          setVisualPatternSelected((value) => (value === 'default' ? 'accessible' : 'default'))
        }
        type={type}
        data={data}
        elements={[
          { type: type === 'combo' ? 'bar' : type, id: 'Users' },
          {
            type: type === 'combo' ? 'line' : type,
            id: 'Engagement',
          },
        ]}
      />
    </Flex>
  );
}
