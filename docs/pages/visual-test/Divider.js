// @flow strict
import { type Node } from 'react';
import { Divider, Box, Flex } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box color="default" borderStyle="shadow" display="inlineBlock" padding={1}>
      <Flex direction="column" gap={2}>
        <Box width={150} height={25} />
        <Divider />
        <Box width={150} height={25} />
      </Flex>
    </Box>
  );
}
