// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, TextField } from 'gestalt';

export default function Screenshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1} width={300}>
        <TextField
          helperText="Password should be at least 20 characters long"
          id="variants-helper-text"
          label="Password"
          onChange={() => {}}
          type="password"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
