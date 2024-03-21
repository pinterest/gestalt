// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, HelpButton } from 'gestalt';

export default function Snapshot(): ReactNode {
  return (
    <Box height={360} padding={1} width={360}>
      <HelpButton
        accessibilityLabel="Click to learn more about help button"
        accessibilityPopoverLabel="Expanded information about help button"
        text="Informational context that's displayed on click"
      />
    </Box>
  );
}
