import { useRef } from 'react';
import { Box, ComboBox, Flex } from 'gestalt';

export default function Example() {
  const ref = useRef<null | HTMLInputElement>(null);

  return (
    <Box height="100%" padding={2} width="100%">
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
        <Flex direction="column" gap={4}>
          <Box width={320}>
            <ComboBox
              accessibilityClearButtonLabel="Clear the current values"
              id="favoriteShape"
              label="Select your favorite shape"
              noResultText="No results for your selection"
              onSelect={() => ref.current?.focus()}
              options={[
                { label: 'square', value: '1' },
                { label: 'circle', value: '2' },
              ]}
              placeholder="Select a shape"
            />
          </Box>
          <Box width={320}>
            <ComboBox
              ref={ref}
              accessibilityClearButtonLabel="Clear the current values"
              id="favoriteColor"
              label="Select your favorite color"
              noResultText="No results for your selection"
              options={[
                { label: 'red', value: '1' },
                { label: 'blue', value: '2' },
                { label: 'green', value: '3' },
                { label: 'yellow', value: '4' },
              ]}
              placeholder="Select a color"
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
