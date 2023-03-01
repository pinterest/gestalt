// @flow strict
import { type Node } from 'react';
import { Box, HelpButton } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box width={360} height={360} padding={1}>
      <HelpButton
        accessibilityLabel="Click to learn more about help button"
        accessibilityPopoverLabel="Expanded information about help button"
        text="Informational context that's displayed on click"
      />
    </Box>
  );
}
