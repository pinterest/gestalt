import { Fragment } from 'react';
import { Box, TextCompact } from 'gestalt';

export default function Snapshot() {
  return (
    <Fragment>
      <Box padding={1}>
        <TextCompact>TextCompact weight default</TextCompact>
      </Box>
      <Box padding={1}>
        <TextCompact weight="emphasis">TextCompact weight emphasis</TextCompact>
      </Box>
    </Fragment>
  );
}
