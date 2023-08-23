// @flow strict
import { type Node } from 'react';
import { Box, Module, Text } from 'gestalt';

export default function Example(): Node {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box column={12} maxWidth={800} padding={2}>
        <Module.Expandable
          accessibilityExpandLabel="Expand the module"
          accessibilityCollapseLabel="Collapse the module"
          id="ModuleExample - default"
          items={[
            {
              children: <Text size="200">Children1</Text>,
              summary: ['summary1', 'summary2', 'summary3'],
              title: 'Title',
            },
          ]}
        />
      </Box>
    </Box>
  );
}
