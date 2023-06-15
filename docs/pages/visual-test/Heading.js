// @flow strict
import { Fragment, type Node } from 'react';
import { Box, Heading } from 'gestalt';

export default function Snapshot(): Node {
  return (
    <Fragment>
      <Box padding={1}>
        <Heading size="100">Heading size 100</Heading>
      </Box>
      <Box padding={1}>
        <Heading size="200">Heading size 200</Heading>
      </Box>
      <Box padding={1}>
        <Heading size="300">Heading size 300</Heading>
      </Box>
      <Box padding={1}>
        <Heading size="400">Heading size 400</Heading>
      </Box>
      <Box padding={1}>
        <Heading size="500">Heading size 500</Heading>
      </Box>
      <Box padding={1}>
        <Heading size="600">Heading size 600</Heading>
      </Box>
    </Fragment>
  );
}
