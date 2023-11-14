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
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <RadioGroup legend="ChartGraph type" direction="row" id="range">
        <RadioGroup.RadioButton
          checked={type === 'bar'}
          id="range-bar"
          label="Bar"
          name="bar"
          onChange={() => setType('bar')}
          value="bar"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'line'}
          id="range-line"
          label="Line"
          name="line"
          onChange={() => setType('line')}
          value="line"
          size="sm"
        />
        <RadioGroup.RadioButton
          checked={type === 'combo'}
          id="range-combo"
          label="Combo"
          name="combo"
          onChange={() => setType('combo')}
          value="combo"
          size="sm"
        />
      </RadioGroup>
      <ChartGraph
        title="ChartGraph"
        titleDisplay="hidden"
        accessibilityLabel="Example of range in charts"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        layout="verticalBiaxial"
        type={type}
        data={data}
        range={{ yAxisLeft: [0, 100] }}
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
      />
    </Flex>
  );
}
