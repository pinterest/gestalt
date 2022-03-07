// @flow strict
import { type Node } from 'react';
import { NumberField, Box, ColorSchemeProvider } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" display="inlineBlock" padding={1}>
        <NumberField
          id="variant-helperText"
          helperText="Round up to the nearest whole number"
          label="Average value"
          onChange={() => {}}
          value={5}
        />
      </Box>
    </ColorSchemeProvider>
  );
}
