// @flow strict
import { type Node, useId, useRef, useState } from 'react';
import { Box, Flex, Label, RadioGroup, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example(): Node {
  const labelId = useId();
  const [width, setWidth] = useState<number>(700);
  const scrollContainerRef = useRef<?HTMLDivElement>();
  const updateWidth = ({ target }: { target: HTMLInputElement }) => {
    setWidth(Number(target.value));
  };

  const [visualPatternSelected, setVisualPatternSelected] = useState('default');
  const [type, setType] = useState('bar');
  const [layout, setLayout] = useState('horizontal');

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
      Series_01: 100,
      Series_02: 200,
    },
    {
      name: 'B',
      Series_01: 200,
      Series_02: 300,
    },
  ];

  return (
    <Box padding={2} width="100%">
      <Flex direction="column" gap={5} width="100%">
        <Flex width="100%" justifyContent="between">
          <RadioGroup legend="ChartGraph type" direction="row" id="responsive-type">
            <RadioGroup.RadioButton
              checked={type === 'bar'}
              id="responsive-type-bar"
              label="Bar"
              name="bar"
              onChange={() => setType('bar')}
              value="bar"
              size="sm"
            />
            <RadioGroup.RadioButton
              checked={type === 'line'}
              id="responsive-type-line"
              label="Line"
              name="line"
              onChange={() => setType('line')}
              value="line"
              size="sm"
            />
            <RadioGroup.RadioButton
              checked={type === 'combo'}
              id="responsive-type-combo"
              label="Combo"
              name="combo"
              onChange={() => setType('combo')}
              value="combo"
              size="sm"
            />
          </RadioGroup>
          <RadioGroup legend="Layout" direction="row" id="responsive_layout">
            <RadioGroup.RadioButton
              checked={layout === 'horizontal'}
              id="responsive_layout-horizontal"
              label="Horizontal"
              name="horizontal"
              onChange={() => setLayout('horizontal')}
              value="horizontal"
              size="sm"
            />
            <RadioGroup.RadioButton
              checked={layout === 'horizontalBiaxial'}
              id="responsive_layout-horizontalBiaxial"
              label="HorizontalBiaxial"
              name="horizontalBiaxial"
              onChange={() => setLayout('horizontalBiaxial')}
              value="horizontalBiaxial"
              size="sm"
            />
            <RadioGroup.RadioButton
              checked={layout === 'vertical'}
              id="responsive_layout-vertical"
              label="Vertical"
              name="vertical"
              onChange={() => setLayout('vertical')}
              value="vertical"
              size="sm"
            />
            <RadioGroup.RadioButton
              checked={layout === 'verticalBiaxial'}
              id="responsive_layout-verticalBiaxial"
              label="VerticalBiaxial"
              name="verticalBiaxial"
              onChange={() => setLayout('verticalBiaxial')}
              value="verticalBiaxial"
              size="sm"
            />
          </RadioGroup>
        </Flex>
        <Flex alignItems="center" direction="column">
          <Flex>
            <Label htmlFor={labelId}>
              <Text>Container Width</Text>
            </Label>
            <Text>{`: ${width}px`}</Text>
          </Flex>
          <input
            id={labelId}
            type="range"
            defaultValue={800}
            onChange={updateWidth}
            min={200}
            max={800}
            step={1}
            style={{ width: '400px', display: 'block', margin: '10px auto' }}
          />
        </Flex>

        <div
          ref={(el) => {
            scrollContainerRef.current = el;
          }}
          style={{
            height: '300px',
            margin: '0 auto',
            outline: '3px solid #ddd',
            overflowY: 'scroll',
            width: `${width}px`,
          }}
        >
          <ChartGraph
            title="ChartGraph"
            titleDisplay="hidden"
            accessibilityLabel="Example of chart with decal custom dimension"
            visualPatternSelected={visualPatternSelected}
            onVisualPatternChange={() =>
              setVisualPatternSelected((value) =>
                value === 'default' ? 'visualPattern' : 'default',
              )
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
        </div>
      </Flex>
    </Box>
  );
}
