// @flow strict
import { type Node } from 'react';
import { Flex, Switch, Box } from 'gestalt';

export default function Screenshot(): Node {
  return (
    <Box color="white" display="inlineBlock" padding={1}>
      <Flex gap={4}>
        <Switch onChange={() => {}} id="1" switched />
        <Switch onChange={() => {}} id="2" />
        <Switch onChange={() => {}} id="3" switched disabled />
        <Switch onChange={() => {}} id="4" disabled />
      </Flex>
    </Box>
  );
}
