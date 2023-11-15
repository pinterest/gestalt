// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ColorSchemeProvider, TextArea } from 'gestalt';

export default function Screenshot(): ReactNode {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" display="inlineBlock" padding={1} width={300}>
        <TextArea
          id="aboutmemore"
          onChange={() => {}}
          placeholder="Write something about yourself..."
          helperText="I love to sail, run and visit remote places"
          label="With a placeholder"
        />
      </Box>
    </ColorSchemeProvider>
  );
}
