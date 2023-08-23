// @flow strict
import { type Node } from 'react';
import { Box, IconButton, Tooltip } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Tooltip text="Customize performance stats for your paid ads">
        <IconButton
          accessibilityLabel="Settings"
          bgColor="white"
          icon="cog"
          iconColor="darkGray"
          size="lg"
        />
      </Tooltip>
    </Box>
  );
}
