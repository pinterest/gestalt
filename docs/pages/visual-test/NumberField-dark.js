// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, NumberField } from 'gestalt';

export default function Screenshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1}>
        <NumberField
          helperText="Round up to the nearest whole number"
          id="variant-helperText"
          label="Average value"
          onChange={() => {}}
          value={5}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
