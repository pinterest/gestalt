import { ReactNode } from 'react';
import { Box, Flex, Heading, Spinner } from 'gestalt';

function Card({ text }: { text: string }) {
  return (
    <Box borderStyle="shadow" height={250} padding={6} rounding={4} width={250}>
      <Flex alignItems="start" direction="column" height="100%" justifyContent="start">
        <Heading size="400">{text}</Heading>

        <Flex.Item alignSelf="center" flex="grow">
          <Flex alignItems="center" height="100%">
            <Spinner accessibilityLabel="Example spinner" show />
          </Flex>
        </Flex.Item>
      </Flex>
    </Box>
  );
}

export default function Example() {
  return (
    <Flex alignItems="center" gap={6} height="100%" justifyContent="center" width="100%">
      <Card text="Top Pins" />
      <Card text="Ads" />
    </Flex>
  );
}
