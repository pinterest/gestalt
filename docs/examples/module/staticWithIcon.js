// @flow strict
import { type Node } from 'react';
import { Box, Module, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box column={12} maxWidth={800} padding={2}>
        <Module
          icon="lock"
          iconAccessibilityLabel="Module Locked - check permission settings"
          id="ModuleExample - icon"
          title="Title"
        >
          <Text size="200">This is example content.</Text>
        </Module>
      </Box>
    </Box>
  );
}
