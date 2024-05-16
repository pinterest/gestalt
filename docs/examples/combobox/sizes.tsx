import { ReactNode, useState } from 'react';
import { Box, ComboBox, Flex, SegmentedControl } from 'gestalt';

export default function Example() {
  const sizes = ['sm', 'md', 'lg'];
  const [size, setSize] = useState('md');
  const options = Array(20)
    .fill(0)
    .map((item, index) => ({
      label: `Label-${index + 1}`,
      value: `Value-${index + 1}`,
      subtext: `Subtext-${index + 1}`,
    }));

  return (
    <Box height="100%" padding={2} width="100%">
      <Flex
        alignItems="center"
        direction="column"
        height="100%"
        justifyContent="center"
        width="100%"
      >
        <Box width={320}>
          <ComboBox
            accessibilityClearButtonLabel="Clear the current value"
            id="subtext"
            label="Choose a value"
            noResultText="No results for your selection"
            options={options}
            placeholder="Select a value"
// @ts-expect-error - TS2322 - Type 'string' is not assignable to type '"sm" | "md" | "lg" | undefined'.
            size={size}
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
    </Box>
  );
}
