// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, ButtonLink, Flex, Text } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Box padding={4}>
      <Flex height="100%" gap={6} width="100%" wrap>
        {['gray', 'red', 'blue', 'transparent'].map((color) => (
          <Flex gap={2} key={color} direction="column">
            <Box
              borderStyle="sm"
              display="flex"
              width={200}
              height={200}
              rounding={4}
              alignItems="center"
              justifyContent="center"
            >
              <ButtonLink href="" color={color} size="lg" text="Visit" iconEnd="visit" />
            </Box>
            <Text size="200" weight="bold">
              color=&quot;{color}&quot;
            </Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
}
