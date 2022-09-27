// @flow strict
import { Text, Box, Flex, Heading } from 'gestalt';
import { type Node } from 'react';

type PrincipleItemProps = {|
  color: string,
  heading: string,
  image?: Node,
  text: string | Node,
|};

export default function PrincipleItem({ color, heading, image, text }: PrincipleItemProps): Node {
  return (
    <Flex
      direction="column"
      gap={{
        row: 0,
        column: 4,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={160}
        width={260}
        dangerouslySetInlineStyle={{
          __style: {
            backgroundColor: `var(--color-${color})`,
          },
        }}
      >
        {image}
      </Box>
      <Heading size="400">{heading}</Heading>
      <Box marginBottom={6}>
        <Text>{text}</Text>
      </Box>
    </Flex>
  );
}
