// @flow strict
import { type Node } from 'react';
import { Box, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex justifyContent="center" height="100%" width="100%">
      <Box color="infoBase" marginStart={12} marginEnd={12} column={12}>
        <Box borderStyle="sm" color="successBase" margin="auto" column={5} height={100} />
        <Box borderStyle="sm" color="warningBase" marginStart="auto" column={3} height={100} />
      </Box>
    </Flex>
  );
}
