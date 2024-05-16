import { ReactNode } from 'react';
import { Box, ColorSchemeProvider, ComboBox, Flex } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" height={200} padding={4} width={300}>
        <Flex justifyContent="center">
          <ComboBox
            accessibilityClearButtonLabel="Clear the current values"
            id="favoriteShape"
            label="Select your favorite shape"
            noResultText="No results for your selection"
            options={[
              { label: 'square', value: '1' },
              { label: 'circle', value: '2' },
            ]}
            placeholder="Select a shape"
          />
        </Flex>
      </Box>
    </ColorSchemeProvider>
  );
}
