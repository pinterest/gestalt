// @flow strict
import { type Node } from 'react';
import { Box, Flex, Heading, Text } from 'gestalt';

type Props = {|
  heading: string,
  text: string | Node,
|};

export default function PrincipleItem({ heading, text }: Props): Node {
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
