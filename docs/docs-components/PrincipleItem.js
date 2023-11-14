// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Heading, Text } from 'gestalt';

type Props = {
  heading: string,
  text: string | ReactNode,
};

export default function PrincipleItem({ heading, text }: Props): ReactNode {
  return (
    <Flex
      direction="column"
      gap={{
        row: 0,
        column: 4,
      }}
    >
      <Heading size="400">{heading}</Heading>
      <Box marginBottom={6}>
        <Text>{text}</Text>
      </Box>
    </Flex>
  );
}
