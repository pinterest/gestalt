// @flow strict
import { type Node } from 'react';
import { Box, Flex, IconButton, Tooltip } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex>
        <Tooltip text="Align left" accessibilityLabel="">
          <IconButton
            accessibilityLabel="Align left"
            bgColor="white"
            icon="text-align-left"
            iconColor="darkGray"
            size="lg"
          />
        </Tooltip>
        <Tooltip text="Align center" accessibilityLabel="">
          <IconButton
            accessibilityLabel="Align center"
            bgColor="white"
            icon="text-align-center"
            iconColor="darkGray"
            size="lg"
          />
        </Tooltip>
        <Tooltip text="Align right" accessibilityLabel="">
          <IconButton
            accessibilityLabel="Align right"
            bgColor="white"
            icon="text-align-right"
            iconColor="darkGray"
            size="lg"
          />
        </Tooltip>
      </Flex>
    </Box>
  );
}
