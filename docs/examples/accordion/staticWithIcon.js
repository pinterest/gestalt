// @flow strict
import { type Node as ReactNode } from 'react';
import { Accordion, Box, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Box column={12} maxWidth={800} padding={2}>
        <Accordion
          icon="lock"
          iconAccessibilityLabel="Accordion Locked - check permission settings"
          id="accordionExample - icon"
          title="Title"
        >
          <Text size="200">This is example content.</Text>
        </Accordion>
      </Box>
    </Box>
  );
}
