// @flow strict
import { type Node as ReactNode } from 'react';
import { Box, Flex, Mask } from 'gestalt';

export default function Example(): ReactNode {
  return (
    <Flex alignItems="center" height="100%" justifyContent="center" width="100%">
      <Mask height={70} rounding="circle" width={70}>
        <Box color="successBase" height={70} width={70} />
      </Mask>
    </Flex>
  );
}
