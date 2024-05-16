import { ReactNode } from 'react';
import { Box, Flex } from 'gestalt';

export default function Example() {
  return (
    <Flex alignContent="center" gap={4} height="100%" justifyContent="center" wrap>
      <Box color="infoBase" height={100} minWidth={50} />
      <Flex.Item flex="grow">
        <Box color="errorBase" height={100} />
      </Flex.Item>
      <Box color="successBase" height={100} minWidth={50} />
      <Box color="warningBase" height={100} minWidth={50} />
    </Flex>
  );
}
