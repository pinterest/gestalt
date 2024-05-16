import {ReactNode} from 'react';
import { Box, ComboBox, Flex } from 'gestalt';

export default function Example() {
  return (
    <Box height="100%" padding={2} width="100%">
      <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
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
