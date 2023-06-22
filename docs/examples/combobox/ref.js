// @flow strict
import { type Node, useRef } from 'react';
import { Box, ComboBox, Flex } from 'gestalt';

export default function Example(): Node {
  const ref = useRef<null | HTMLInputElement>(null);

  return (
    <Box padding={2} width="100%" height="100%">
      <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
        <Flex direction="column" gap={4}>
          <Box width={320}>
            <ComboBox
              accessibilityClearButtonLabel="Clear the current values"
              label="Select your favorite shape"
              id="favoriteShape"
              noResultText="No results for your selection"
              options={[
                { label: 'square', value: '1' },
                { label: 'circle', value: '2' },
              ]}
              onSelect={() => ref.current?.focus()}
              placeholder="Select a shape"
            />
          </Box>
          <Box width={320}>
            <ComboBox
              accessibilityClearButtonLabel="Clear the current values"
              label="Select your favorite color"
              id="favoriteColor"
              noResultText="No results for your selection"
              options={[
                { label: 'red', value: '1' },
                { label: 'blue', value: '2' },
                { label: 'green', value: '3' },
                { label: 'yellow', value: '4' },
              ]}
              placeholder="Select a color"
              ref={ref}
            />
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
