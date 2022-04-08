// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, Tooltip, IconButton, Box } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="white" padding={4} width={150}>
        <Tooltip idealDirection="right" inline text="Share" accessibilityLabel="">
          <IconButton
            accessibilityLabel="Share this Pin"
            bgColor="white"
            icon="share"
            iconColor="darkGray"
            size="lg"
          />
        </Tooltip>
      </Box>
    </ColorSchemeProvider>
  );
}
