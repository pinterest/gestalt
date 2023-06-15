// @flow strict
import { type Node } from 'react';
import { Box, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex width="100%" height="100%" gap={4} wrap alignContent="center" justifyContent="center">
      <Box rounding="circle" width={100} height={100} color="infoBase" />
      <Box rounding={7} width={100} height={100} color="warningBase" />
      <Box rounding={3} width={100} height={100} color="errorBase" />
      <Box width={100} height={100} color="successBase" />
    </Flex>
  );
}
