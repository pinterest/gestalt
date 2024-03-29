// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Button, Flex, IconButton, Tooltip } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Button color="red" disabled size="lg" text="Create account" />
      <Box>
        <Tooltip text="You need to fill in a username to create an account">
          <IconButton
            accessibilityLabel="Additional info."
            bgColor="white"
            icon="info-circle"
            iconColor="gray"
            size="lg"
          />
        </Tooltip>
      </Box>
    </Flex>
  );
}
