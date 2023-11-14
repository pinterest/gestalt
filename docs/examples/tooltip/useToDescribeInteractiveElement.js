// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, IconButton, Tooltip } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Tooltip text="Send Pin" accessibilityLabel="">
        <IconButton
          accessibilityLabel="Send Pin"
          bgColor="white"
          icon="share"
          iconColor="darkGray"
          size="lg"
        />
      </Tooltip>
    </Box>
  );
}
