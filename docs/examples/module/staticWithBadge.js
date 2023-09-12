// @flow strict
import { type Node } from 'react';
import { Box, Module, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box column={12} maxWidth={800} padding={2}>
        <Module badge={{ text: 'Beta' }} id="ModuleExample - badge" title="Title">
          <Text size="200">This is example content.</Text>
        </Module>
        <Module
          badge={{ text: 'Not started', type: 'neutral' }}
          id="ModuleExample - badge neutral"
          title="Title"
        >
          <Text size="200">This is example content.</Text>
        </Module>
      </Box>
    </Box>
  );
}
