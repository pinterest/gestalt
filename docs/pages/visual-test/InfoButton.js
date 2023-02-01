// @flow strict
import { type Node } from 'react';
import { Box, InfoButton } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box padding={1}>
      <InfoButton
        text="Informational context that's displayed on click"
        accessibilityPopoverLabel="Popover context description"
      />
    </Box>
  );
}
