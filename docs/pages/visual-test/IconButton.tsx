import { ReactNode } from 'react';
import { Box, IconButton } from 'gestalt';

export default function Snapshot() {
  return (
    <Box padding={1}>
      <IconButton
        accessibilityLabel="IconButton"
        bgColor="lightGray"
        icon="visit"
        iconColor="darkGray"
        size="md"
      />
    </Box>
  );
}
