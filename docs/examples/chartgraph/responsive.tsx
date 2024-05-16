import { ReactNode, useId, useRef, useState } from 'react';
import { Box, Flex, Label, RadioGroup, Text } from 'gestalt';
import { ChartGraph } from 'gestalt-charts';

export default function Example() {
  const labelId = useId();
  const [width, setWidth] = useState<number>(700);
  const scrollContainerRef = useRef<HTMLDivElement | null | undefined>();
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
        <Flex justifyContent="between" width="100%">
          <RadioGroup direction="row" id="responsive-type" legend="ChartGraph type">
            <RadioGroup.RadioButton
              checked={type === 'bar'}
              id="responsive-type-bar"
              label="Bar"
              name="bar"
              onChange={() => setType('bar')}
              size="sm"
              value="bar"
            />
            <RadioGroup.RadioButton
              checked={type === 'line'}
              id="responsive-type-line"
              label="Line"
              name="line"
              onChange={() => setType('line')}
              size="sm"
              value="line"
            />
            <RadioGroup.RadioButton
              checked={type === 'combo'}
              id="responsive-type-combo"
              label="Combo"
              name="combo"
              onChange={() => setType('combo')}
              size="sm"
              value="combo"
            />
          </RadioGroup>
          <RadioGroup direction="row" id="responsive_layout" legend="Layout">
            <RadioGroup.RadioButton
              checked={layout === 'horizontal'}
              id="responsive_layout-horizontal"
              label="Horizontal"
              name="horizontal"
              onChange={() => setLayout('horizontal')}
              size="sm"
              value="horizontal"
            />
            <RadioGroup.RadioButton
              checked={layout === 'horizontalBiaxial'}
              id="responsive_layout-horizontalBiaxial"
              label="HorizontalBiaxial"
              name="horizontalBiaxial"
              onChange={() => setLayout('horizontalBiaxial')}
              size="sm"
              value="horizontalBiaxial"
            />
            <RadioGroup.RadioButton
              checked={layout === 'vertical'}
              id="responsive_layout-vertical"
              label="Vertical"
              name="vertical"
              onChange={() => setLayout('vertical')}
              size="sm"
              value="vertical"
            />
            <RadioGroup.RadioButton
              checked={layout === 'verticalBiaxial'}
              id="responsive_layout-verticalBiaxial"
              label="VerticalBiaxial"
              name="verticalBiaxial"
              onChange={() => setLayout('verticalBiaxial')}
              size="sm"
              value="verticalBiaxial"
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
            defaultValue={800}
            id={labelId}
            max={800}
            min={200}
            onChange={updateWidth}
            step={1}
            style={{ width: '400px', display: 'block', margin: '10px auto' }}
            type="range"
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
            accessibilityLabel="Example of chart with decal custom dimension"
            // @ts-expect-error - TS2322 - Type '{ name: string; Series_01: number; Series_02: number; }[]' is not assignable to type 'readonly { [k: string]: number | undefined; [k: number]: number | undefined; }[]'.
            data={data}
            elements={[
              {
                // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"line" | "bar"'.
                type: type === 'combo' ? 'bar' : type,
                id: 'Series_01',
                // @ts-expect-error - TS2322 - Type 'string | undefined' is not assignable to type '"bottom" | "left" | "right" | "top" | undefined'.
                axis: axisSeries01,
              },
              {
                // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"line" | "bar"'.
                type: type === 'combo' ? 'line' : type,
                id: 'Series_02',
                // @ts-expect-error - TS2322 - Type 'string | undefined' is not assignable to type '"bottom" | "left" | "right" | "top" | undefined'.
                axis: axisSeries02,
              },
            ]}
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"horizontal" | "vertical" | "horizontalBiaxial" | "verticalBiaxial" | undefined'.
            layout={layout}
            legend="none"
            onVisualPatternChange={() =>
              setVisualPatternSelected((value) =>
                value === 'default' ? 'visualPattern' : 'default',
              )
            }
            title="ChartGraph"
            titleDisplay="hidden"
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"line" | "bar" | "combo" | undefined'.
            type={type}
            // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"disabled" | "default" | "visualPattern"'.
            visualPatternSelected={visualPatternSelected}
          />
        </div>
      </Flex>
    </Box>
  );
}
