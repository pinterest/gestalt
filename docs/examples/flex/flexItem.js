// @flow strict
import { type Node } from 'react';
import { Box, Button, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" justifyContent="center" alignItems="center">
      <Box paddingX={2} paddingY={2} width="100%">
        <Flex alignItems="center" gap={4}>
          <Button text="Button 1" />
          <Flex.Item flex="grow">
            <Button text="Button 2" />
          </Flex.Item>
          <Button text="Button 3" />
        </Flex>
      </Box>
    </Flex>
  );
}
