// @flow strict
import { Box, Flex, Text } from 'gestalt';

const condition = true;
const gapValue = 2;
const alternateGapValue = 8;

export default function TestComponent() {
  return (
    <Box>
      <Flex gap={3}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </Flex>

      <Flex direction="row" gap={3}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </Flex>

      <Flex direction="column" gap={3}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </Flex>

      <Flex gap={gapValue}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </Flex>

      <Flex gap={condition ? 2 : 3}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </Flex>

      <Flex gap={condition ? gapValue : alternateGapValue}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </Flex>
    </Box>
  );
}
