// @flow strict
import { type Node } from 'react';
import { Box, Flex } from 'gestalt';

export default function Example(): Node {
  return (
    <Flex gap={4} wrap height="100%" alignContent="center" justifyContent="center">
      <Box color="infoBase" minWidth={50} height={100} />
      <Flex.Item flex="grow">
        <Box color="errorBase" height={100} />
      </Flex.Item>
      <Box color="successBase" minWidth={50} height={100} />
      <Box color="warningBase" minWidth={50} height={100} />
    </Flex>
  );
}
