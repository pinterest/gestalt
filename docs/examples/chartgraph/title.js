// @flow strict
import { type Node, useState } from 'react';
import { Flex, RadioGroup } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [type, setType] = useState('bar');

  const data = [
    {
      name: 'A',
      'Series_01': 100,
    },
    {
      name: 'B',
      'Series_01': 200,
    },
    {
      name: 'C',
      'Series_01': 300,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <RadioGroup legend="ChartGraph type" direction="row" id="title">
        <RadioGroup.RadioButton
          checked={type === 'bar'}
          id="title-bar"
          label="Bar"
          name="bar"
          onChange={() => setType('bar')}
          value="bar"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'line'}
          id="title-line"
          label="Line"
          name="line"
          onChange={() => setType('line')}
          value="line"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'composed'}
          id="title-composed"
          label="Composed"
          name="composed"
          onChange={() => setType('composed')}
          value="composed"
          size="sm"
        />
      </RadioGroup>
      <ChartGraph
        accessibilityLabel="Example of chart with title and description"
        visualPatternSelected="disabled"
        onVisualPatternChange={() => {}}
        type={type}
        title="Title"
        description="Description"
        legend="none"
        data={data}
        elements={[
          {
            type: type === 'composed' ? 'bar' : type,
            id: 'Series_01',
          },
        ]}
      />
    </Flex>
  );
}
