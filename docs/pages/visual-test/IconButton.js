// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, IconButton } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box padding={1}>
      <IconButton
        accessibilityLabel="IconButton"
        icon="visit"
        bgColor="lightGray"
        iconColor="darkGray"
        size="md"
      />
    </Box>
  );
}
