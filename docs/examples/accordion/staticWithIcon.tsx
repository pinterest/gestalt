import { ReactNode } from 'react';
import { Accordion, Box, Text } from 'gestalt';

export default function Example() {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
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
