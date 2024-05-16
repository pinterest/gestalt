import { ReactNode } from 'react';
import { Box, ColorSchemeProvider, IconButton, Tooltip } from 'gestalt';

export default function Snapshot() {
  return (
    <ColorSchemeProvider colorScheme="dark">
      <Box color="default" padding={4} width={150}>
        <Tooltip accessibilityLabel="" idealDirection="right" inline text="Share">
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
