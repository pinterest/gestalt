// @flow strict
import { type Node } from 'react';
import { Box, IconButton, Module, Text } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <Box color="default" display="inlineBlock" padding={1}>
      <Module
        iconButton={
          <IconButton
            bgColor="lightGray"
            icon="question-mark"
            iconColor="darkGray"
            accessibilityLabel="Get help"
            size="xs"
            onClick={() => {}}
          />
        }
        id="ModuleExample - iconButton"
        title="Title"
      >
        <Text size="200">This is example content.</Text>
      </Module>
    </Box>
  );
}
