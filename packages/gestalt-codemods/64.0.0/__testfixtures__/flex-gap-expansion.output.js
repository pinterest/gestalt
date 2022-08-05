// @flow strict
import { Box, Flex, Text } from 'gestalt';

const condition = true;
const gapValue = 2;
const alternateGapValue = 8;

export default function TestComponent() {
  return (
    <Box>
      <Flex gap={{
        row: 3,
        column: 0
      }}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </Flex>

      <Flex direction="row" gap={{
        row: 3,
        column: 0
      }}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </Flex>

      <Flex direction="column" gap={{
        row: 0,
        column: 3
      }}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </Flex>

      <Flex gap={{
        row: gapValue,
        column: 0
      }}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </Flex>

      <Flex gap={{
        row: condition ? 2 : 3,
        column: 0
      }}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </Flex>

      <Flex gap={{
        row: condition ? gapValue : alternateGapValue,
        column: 0
      }}>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </Flex>
    </Box>
  );
}
