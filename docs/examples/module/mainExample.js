// @flow strict
import { type Node } from 'react';
import { Box, Flex, Module, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" width="100%" justifyContent="between" gap={{ column: 2, row: 0 }}>
        <Module
          icon="lock"
          iconAccessibilityLabel="Module Locked - check permission settings"
          id="ModuleExample - header"
          title="Title"
        >
          <Text size="200">This is example content.</Text>
        </Module>
        <Module.Expandable
          accessibilityExpandLabel="Expand the module"
          accessibilityCollapseLabel="Collapse the module"
          id="ModuleExample - header expandable"
          items={[
            {
              children: <Text size="200">Content here</Text>,
              summary: ['summary'],
              title: 'Title',
            },
          ]}
        />
      </Flex>
    </Box>
  );
}
