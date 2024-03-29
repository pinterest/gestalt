// @flow strict
import { type Node as ReactNode } from 'react';
import { Accordion, Box, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box alignItems="center" display="flex" height="100%" justifyContent="center" padding={8}>
      <Flex direction="column" flex="grow" gap={{ column: 2, row: 0 }} maxWidth={800}>
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
