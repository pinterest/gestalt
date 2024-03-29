// @flow strict
import { type Node as ReactNode } from 'react';
import { Accordion, Box, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Box column={12} maxWidth={800} padding={2}>
        <Accordion badge={{ text: 'Beta' }} id="accordionExample - badge" title="Title">
          <Text size="200">This is example content.</Text>
        </Accordion>
        <Accordion
          badge={{ text: 'Not started', type: 'neutral' }}
          id="accordionExample - badge neutral"
          title="Title"
        >
          <Text size="200">This is example content.</Text>
        </Accordion>
      </Box>
    </Box>
  );
}
