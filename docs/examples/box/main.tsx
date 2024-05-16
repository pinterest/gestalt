import { ReactNode } from 'react';
import { Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignContent="center" gap={4} height="100%" justifyContent="center" width="100%" wrap>
      <Box color="infoBase" height={100} rounding="circle" width={100} />
      <Box color="warningBase" height={100} rounding={7} width={100} />
      <Box color="errorBase" height={100} rounding={3} width={100} />
      <Box color="successBase" height={100} width={100} />
    </Flex>
  );
}
