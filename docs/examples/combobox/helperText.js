// @flow strict
import { type Node } from 'react';
import { Box, ComboBox, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={2} width="100%" height="100%">
      <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
        <Box width={320}>
          <ComboBox
            accessibilityClearButtonLabel="Clear the current value"
            helperText="Select one from all your current active accounts."
            id="helperText"
            label="Select account"
            noResultText="No results for your selection"
            options={[]}
          />
        </Box>
      </Flex>
    </Box>
  );
}
