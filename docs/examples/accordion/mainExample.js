// @flow strict
import { type Node as ReactNode } from 'react';
import { Accordion, Box, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" width="100%" justifyContent="between" gap={{ column: 2, row: 0 }}>
        <Accordion
          icon="lock"
          iconAccessibilityLabel="Accordion Locked - check permission settings"
          id="accordionExample - header"
          title="Title"
        >
          <Text size="200">This is example content.</Text>
        </Accordion>
        <Accordion.Expandable
          accessibilityExpandLabel="Expand the accordion"
          accessibilityCollapseLabel="Collapse the accordion"
          id="accordionExample - header expandable"
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
