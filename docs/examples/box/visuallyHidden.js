// @flow strict
import { type Node } from 'react';
import { Text, Box, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex height="100%" width="100%" justifyContent="center" alignItems="center">
      <Text>Enable your screen reader to hear the following text:</Text>
      <Box display="visuallyHidden">Hi there.</Box>
    </Flex>
  );
}
