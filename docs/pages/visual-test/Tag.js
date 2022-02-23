// @flow strict
import { type Node } from 'react';
import { ColorSchemeProvider, Flex, Tag } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <ColorSchemeProvider colorScheme="light">
      <Flex direction="column" gap={2}>
        <Tag onRemove={() => {}} removeIconAccessibilityLabel="Remove" text="New" />
        <Tag disabled text="Disabled" />
        <Tag
          onRemove={() => {}}
          errorMessage="NOPE"
          removeIconAccessibilityLabel="Remove"
          text="Error"
        />
        <Tag
          onRemove={() => {}}
          removeIconAccessibilityLabel="Remove"
          text="Some really long text that just keeps going on and on and on and on and on and on"
        />
      </Flex>
    </ColorSchemeProvider>
  );
}
