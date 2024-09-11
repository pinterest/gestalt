import { Fragment } from 'react';
import { Box, TextUI } from 'gestalt';

export default function Snapshot() {
  return (
    <Fragment>
      <Box padding={1}>
        <TextUI size="xs">TextUI size xs</TextUI>
      </Box>
      <Box padding={1}>
        <TextUI size="sm">TextUI size sm</TextUI>
      </Box>
      <Box padding={1}>
        <TextUI size="md">TextUI size md</TextUI>
      </Box>
      <Box padding={1}>
        <TextUI size="lg">TextUI size lg</TextUI>
      </Box>
    </Fragment>
  );
}
