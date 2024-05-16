import { ReactNode } from 'react';
import { Box, Flex, IconButton, Tooltip } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex>
        <Tooltip accessibilityLabel="" text="Align left">
          <IconButton
            accessibilityLabel="Align left"
            bgColor="white"
            icon="text-align-left"
            iconColor="darkGray"
            size="lg"
          />
        </Tooltip>
        <Tooltip accessibilityLabel="" text="Align center">
          <IconButton
            accessibilityLabel="Align center"
            bgColor="white"
            icon="text-align-center"
            iconColor="darkGray"
            size="lg"
          />
        </Tooltip>
        <Tooltip accessibilityLabel="" text="Align right">
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
