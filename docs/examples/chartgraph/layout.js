// @flow strict
import { type Node, useState } from 'react';
import { Flex, RadioGroup } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const [visualPatternSelected, setVisualPatternSelected] = useState('default');
  const [type, setType] = useState('bar');
  const [layout, setLayout] = useState('vertical');

  let axisSeries01;
  let axisSeries02;

  if (layout === 'horizontalBiaxial') {
    axisSeries01 = 'bottom';
    axisSeries02 = 'top';
  }

  if (layout === 'verticalBiaxial') {
    axisSeries01 = 'left';
    axisSeries02 = 'right';
  }

  const data = [
    {
      name: 'A',
      'Series_01': 100,
      'Series_02': 200,
    },
    {
      name: 'B',
      'Series_01': 200,
      'Series_02': 300,
    },
  ];

  return (
    <Flex height="100%" width="100%" direction="column" gap={2}>
      <Flex width="100%" justifyContent="between" wrap>
        <RadioGroup legend="ChartGraph type" direction="row" id="layout-type">
          <RadioGroup.RadioButton
            checked={type === 'bar'}
            id="layout-type-bar"
            label="Bar"
            name="bar"
            onChange={() => setType('bar')}
            value="bar"
            size="sm"
          />
          <RadioGroup.RadioButton
            checked={type === 'line'}
            id="layout-type-line"
            label="Line"
            name="line"
            onChange={() => setType('line')}
            value="line"
            size="sm"
          />
          <RadioGroup.RadioButton
            checked={type === 'combo'}
            id="layout-type-combo"
            label="combo"
            name="combo"
            onChange={() => setType('combo')}
            value="combo"
            size="sm"
          />
        </RadioGroup>
        <RadioGroup legend="Layout" direction="row" id="layout_layout">
          <RadioGroup.RadioButton
            checked={layout === 'horizontal'}
            id="layout_layout-horizontal"
            label="Horizontal"
            name="horizontal"
            onChange={() => setLayout('horizontal')}
            value="horizontal"
            size="sm"
          />
          <RadioGroup.RadioButton
            checked={layout === 'horizontalBiaxial'}
            id="layout_layout-horizontalBiaxial"
            label="HorizontalBiaxial"
            name="horizontalBiaxial"
            onChange={() => setLayout('horizontalBiaxial')}
            value="horizontalBiaxial"
            size="sm"
          />
          <RadioGroup.RadioButton
            checked={layout === 'vertical'}
            id="layout_layout-vertical"
            label="Vertical"
            name="vertical"
            onChange={() => setLayout('vertical')}
            value="vertical"
            size="sm"
          />
          <RadioGroup.RadioButton
            checked={layout === 'verticalBiaxial'}
            id="layout_layout-verticalBiaxial"
            label="VerticalBiaxial"
            name="verticalBiaxial"
            onChange={() => setLayout('verticalBiaxial')}
            value="verticalBiaxial"
            size="sm"
          />
        </RadioGroup>
      </Flex>

      <ChartGraph
        title="ChartGraph"
        titleDisplay="hidden"
        accessibilityLabel="Example of chart with decal custom dimension"
        visualPatternSelected={visualPatternSelected}
        onVisualPatternChange={() =>
          setVisualPatternSelected((value) => (value === 'default' ? 'visualPattern' : 'default'))
        }
        layout={layout}
        type={type}
        legend="none"
        data={data}
        elements={[
          {
            type: type === 'combo' ? 'bar' : type,
            id: 'Series_01',
            axis: axisSeries01,
          },
          {
            type: type === 'combo' ? 'line' : type,
            id: 'Series_02',
            axis: axisSeries02,
          },
        ]}
      />
    </Flex>
  );
}
