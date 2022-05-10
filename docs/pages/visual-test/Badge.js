// @flow strict
import { type Node } from 'react';
import { Badge, Box, Flex } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Box color="white" padding={1}>
      <Flex gap={1} wrap width={400}>
        <Badge text="Info badge" />
        <Badge text="Success badge" type="success" />
        <Badge text="Error badge" type="error" />
        <Badge text="Warning badge" type="warning" />
        <Badge text="Neutral badge" type="neutral" />
        <Badge text="LightWash badge" type="lightWash" />
        <Badge text="DarkWash badge" type="darkWash" />
      </Flex>
    </Box>
  );
}
