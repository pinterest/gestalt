// @flow strict
import { type Node as ReactNode, useState } from 'react';
import { Flex, RadioGroup } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): ReactNode {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');
  const [type, setType] = useState('bar');

  const data = [
    {
      name: 'A',
      'Percentage': 20,
      'Absolute': 2000,
    },
    {
      name: 'B',
      'Percentage': 40,
      'Absolute': 3000,
    },
    {
      name: 'C',
      'Percentage': 80,
      'Absolute': 4000,
    },
  ];

  return (
    <Flex direction="column" gap={2} height="100%" width="100%">
      <RadioGroup direction="row" id="range" legend="ChartGraph type">
        <RadioGroup.RadioButton
          checked={type === 'bar'}
          id="range-bar"
          label="Bar"
          name="bar"
          onChange={() => setType('bar')}
          size="sm"
          value="bar"
        />
        <RadioGroup.RadioButton
          checked={type === 'line'}
          id="range-line"
          label="Line"
          name="line"
          onChange={() => setType('line')}
          size="sm"
          value="line"
        />
        <RadioGroup.RadioButton
          checked={type === 'combo'}
          id="range-combo"
          label="Combo"
          name="combo"
          onChange={() => setType('combo')}
          size="sm"
          value="combo"
        />
      </RadioGroup>
      <ChartGraph
        accessibilityLabel="Example of range in charts"
        data={data}
        elements={[
          {
            type: type === 'combo' ? 'bar' : type,
            id: 'Percentage',
            axis: 'left',
          },
          {
            type: type === 'combo' ? 'line' : type,
            id: 'Absolute',
            axis: 'right',
          },
        ]}
        layout="verticalBiaxial"
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        range={{ yAxisLeft: [0, 100] }}
        title="ChartGraph"
        titleDisplay="hidden"
        type={type}
        visualPatternSelected={visualPatternSelected}
      />
    </Flex>
  );
}
