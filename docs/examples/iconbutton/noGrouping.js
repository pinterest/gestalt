// @flow strict
import { type Node } from 'react';
import { Box, Button, Flex, IconButton, Tooltip } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={4}>
      <Flex gap={2}>
        <Tooltip text="Navigate to previous page">
          <IconButton accessibilityLabel="Back" icon="arrow-back" size="md" />
        </Tooltip>
        <Tooltip text="Send pin">
          <IconButton accessibilityLabel="Share" icon="share" size="md" />
        </Tooltip>
        <Tooltip text="Edit board details and sections">
          <IconButton accessibilityLabel="Customize" icon="edit" size="md" />
        </Tooltip>
        <Tooltip text="Create new pin or board">
          <IconButton accessibilityLabel="Create" icon="add" size="md" />
        </Tooltip>
        <Tooltip text="Search this board">
          <IconButton accessibilityLabel="Search" icon="search" size="md" />
        </Tooltip>
        <Button color="red" text="Save" size="md" />
      </Flex>
    </Box>
  );
}
