// @flow strict
import { type Node as ReactNode } from 'react';
import { Accordion, Box, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={8} height="100%" display="flex" alignItems="center" justifyContent="center">
      <Flex direction="column" gap={{ column: 2, row: 0 }} maxWidth={800} flex="grow">
        <Accordion id="accordionExample - default - 1">
          <Text size="200">This is example content.</Text>
        </Accordion>

        <Accordion id="accordionExample - default - 2" title="Title">
          <Text size="200">This is example content.</Text>
        </Accordion>
      </Flex>
    </Box>
  );
}
