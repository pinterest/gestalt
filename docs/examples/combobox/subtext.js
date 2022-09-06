// @flow strict
import { type Node } from 'react';
import { Box, ComboBox, Flex } from 'gestalt';

export default function Example(): Node {
  const options = Array(20)
    .fill(0)
    .map((item, index) => ({
      label: `Label-${index + 1}`,
      value: `Value-${index + 1}`,
      subtext: `Subtext-${index + 1}`,
    }));

  return (
    <Box padding={2} width="100%" height="100%">
      <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
        <Box width={320}>
          <ComboBox
            accessibilityClearButtonLabel="Clear the current value"
            label="Choose a value"
            id="subtext"
            noResultText="No results for your selection"
            options={options}
            placeholder="Select a value"
          />
        </Box>
      </Flex>
    </Box>
  );
}
