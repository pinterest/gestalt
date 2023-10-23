// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Spinner } from 'gestalt';

function Card({ text }: { text: string }) {
  return (
    <Box rounding={4} height={250} width={250} padding={6} borderStyle="shadow">
      <Flex direction="column" alignItems="start" justifyContent="start" height="100%">
        <Heading size="400">{text}</Heading>

        <Flex.Item alignSelf="center" flex="grow">
          <Flex height="100%" alignItems="center">
            <Spinner show accessibilityLabel="Example spinner" />
          </Flex>
        </Flex.Item>
      </Flex>
    </Box>
  );
}

export default function Example(): Node {
  return (
    <Flex alignItems="center" gap={6} height="100%" justifyContent="center" width="100%">
      <Card text="Top Pins" />
      <Card text="Ads" />
    </Flex>
  );
}
