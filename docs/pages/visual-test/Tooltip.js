// @flow strict
import { type Node } from 'react';
import { Box, IconButton, Tooltip } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box color="default" padding={4} width={150}>
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
  );
}
