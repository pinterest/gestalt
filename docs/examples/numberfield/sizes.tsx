import { useState } from 'react';
import { Box, Flex, NumberField, SegmentedControl } from 'gestalt';

export default function Example() {
  const [currentValue, setCurrentValue] = useState<undefined | number>();
  const sizes = ['sm', 'md', 'lg'];
  const [size, setSize] = useState('md');

  return (
    <Flex alignItems="center" gap={4} height="100%" justifyContent="center" width="100%">
      <Box width={400}>
        <NumberField
          id="header-example"
          label="Number of widgets"
          onChange={({ value }) => {
            setCurrentValue(value);
          }}
          placeholder="Please enter the number of widgets"
          // @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"sm" | "md" | "lg" | undefined'.
          size={size}
          value={currentValue}
        />
        <Box paddingY={5}>
          <SegmentedControl
            items={sizes}
            onChange={({ activeIndex }) => {
              setSize(sizes[activeIndex]);
            }}
            selectedItemIndex={sizes.indexOf(size)}
            size="sm"
          />
        </Box>
      </Box>
    </Flex>
  );
}
