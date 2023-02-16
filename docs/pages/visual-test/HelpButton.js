// @flow strict
import { type Node } from 'react';
import { Box, HelpButton } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box width={360} height={360} padding={1}>
      <HelpButton
        text="Informational context that's displayed on click"
        accessibilityPopoverLabel="Popover context description"
      />
    </Box>
  );
}
