// @flow strict
import { type Node as ReactNode } from 'react';
import { Accordion, Box, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box column={12} maxWidth={800} padding={2}>
        <Accordion.Expandable
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
